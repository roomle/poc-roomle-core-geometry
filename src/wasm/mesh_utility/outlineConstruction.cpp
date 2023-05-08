#include "mesh_utility/meshSpecification.h"
#include "mesh_utility/outlineConstruction.h"
#include <algorithm>
#include <map>
#include <set>

using namespace roomle::mesh;

OutlineConstructor OutlineConstructor::fromSingleMesh(
        const Vertices &vertices3d,
        const Indices &triangleIndices,
        float epsilon) {
    UniqueIndices uniqueIndices;
    auto indexMap = uniqueIndices.createUniqueIndices(vertices3d.data(), vertices3d.size() / 3, epsilon);
    Indices provokingTriangleIndices(triangleIndices.size(), 0);
    std::transform(triangleIndices.begin(), triangleIndices.end(), provokingTriangleIndices.begin(), [&indexMap](uint32_t index) {
        return indexMap[index];
    });
    return {vertices3d, provokingTriangleIndices, epsilon};
}

OutlineConstructor::OutlineConstructor(const Vertices &vertices3d, const Indices &uniqueTriangleIndices, float epsilon)
    : epsilon(epsilon)
    , vertices3d(vertices3d)
    , uniqueTriangleIndices(uniqueTriangleIndices) {}

std::vector<float> OutlineConstructor::create2dOutline(
        const Vector3 &planeNormal,
        const Vector3 &planeUp) const {
    auto projected3dVertices = projectVerticesToPlane(planeNormal, planeUp);
    auto normals = calculateTriangleNormalVectors(projected3dVertices, uniqueTriangleIndices);
    auto outlineCandidates = identifyOutlineCandidates(uniqueTriangleIndices, normals);
    auto [vertices2d, uniqueLineSegments] = createUnique2dSegments(projected3dVertices, outlineCandidates);
    Vertices outline2d = createOutlineFromLineSegments(vertices2d, uniqueLineSegments);
    return outline2d;
}

std::vector<float> OutlineConstructor::projectVerticesToPlane(
        const Vector3 &planeNormal,
        const Vector3 &planeUp) const {
    auto zAxis = normalize3(planeNormal);
    auto yAxis = normalize3(planeUp);
    auto xAxis = cross3(yAxis, zAxis);
    yAxis = cross3(zAxis, xAxis);

    Vertices projectedVertices;
    projectedVertices.reserve(vertices3d.size());
    for (size_t i = 0; i < vertices3d.size(); i += 3) {
        auto v = vertices3d.data() + i;
        auto px = dot3(v, xAxis);
        auto py = dot3(v, yAxis);
        auto pz = dot3(v, zAxis);
        projectedVertices.push_back(px);
        projectedVertices.push_back(py);
        projectedVertices.push_back(pz);
    }
    return projectedVertices;
}

OutlineConstructor::Normals OutlineConstructor::calculateTriangleNormalVectors(
        const Vertices &vertices,
        const Indices &triangleIndices) {
    Normals normals;
    normals.reserve(triangleIndices.size());
    for (size_t i = 0; i < triangleIndices.size(); i += 3) {
        auto v0 = vertices.data() + triangleIndices[i] * 3;
        auto v1 = vertices.data() + triangleIndices[i + 1] * 3;
        auto v2 = vertices.data() + triangleIndices[i + 2] * 3;
        auto n = normalize3(cross3(sub3(v1, v0), sub3(v2, v0)));
        normals.push_back(n[0]);
        normals.push_back(n[1]);
        normals.push_back(n[2]);
    }
    return normals;
}

OutlineConstructor::LineSegments OutlineConstructor::identifyOutlineCandidates(
        const Indices &triangleIndices,
        const Normals &normals) {
    struct FaceCount {
        int frontFaceCount;
        int backFaceCount;
    };
    std::map<LineSegment, FaceCount> edgeMap;
    for (size_t i = 0; i < triangleIndices.size(); i += 3) {
        Indices indices(triangleIndices.data() + i, triangleIndices.data() + i + 3);
        std::sort(indices.begin(), indices.end());
        auto n = normals.data() + i;
        auto frontFace = n[2] > 0;
        LineSegments edges{
                LineSegment(indices[0], indices[1]),
                LineSegment(indices[1], indices[2]),
                LineSegment(indices[0], indices[2])
        };
        for (auto &edge : edges) {
            auto it = edgeMap.find(edge);
            if (it == edgeMap.end()) {
                edgeMap.insert({edge, {frontFace ? 1 : 0, frontFace ? 0 : 1}});
            } else {
                if (frontFace) {
                    ++it->second.frontFaceCount;
                } else {
                    ++it->second.backFaceCount;
                }
            }
        }
    }
    LineSegments outlineCandidates;
    for (auto &entry : edgeMap) {
        bool isCandidate =
                (entry.second.frontFaceCount + entry.second.backFaceCount == 1) ||
                (entry.second.frontFaceCount == 1 && entry.second.backFaceCount == 1);
        if (isCandidate)
            outlineCandidates.push_back(entry.first);
    }
    return outlineCandidates;
}

std::tuple<OutlineConstructor::Vertices, OutlineConstructor::LineSegments> OutlineConstructor::createUnique2dSegments(
        const Vertices &projectedVertices,
        const LineSegments &uniqueSegments3d) const {
    UniqueIndices uniqueIndices;
    Vertices vertices2d;
    vertices2d.reserve(projectedVertices.size() / 3 * 2);
    Indices indexMap;
    indexMap.reserve(projectedVertices.size() / 3);
    for (size_t i = 0; i < projectedVertices.size(); i += 3) {
        Vector3 v2d = {projectedVertices[i], projectedVertices[i+1], 0};
        auto index = uniqueIndices.getVertexIndex(v2d.data(), epsilon);
        indexMap.push_back(index);
        if (index * 2 == vertices2d.size()) {
            vertices2d.push_back(v2d[0]);
            vertices2d.push_back(v2d[1]);
        }
    }
    std::set<LineSegment> uniqueSegmentSet;
    for (auto &lineSegment3d: uniqueSegments3d) {
        auto i0 = indexMap[lineSegment3d.first];
        auto i1 = indexMap[lineSegment3d.second];
        if (i0 == i1)
            continue;
        uniqueSegmentSet.insert(LineSegment{std::min(i0, i1), std::max(i0, i1)});
    }
    LineSegments uniqueSegments(uniqueSegmentSet.begin(), uniqueSegmentSet.end());
    return {vertices2d, uniqueSegments};
}

OutlineConstructor::Vertices OutlineConstructor::createOutlineFromLineSegments(
        const Vertices &vertices2d,
        const LineSegments &lineSegments) {
    auto graph = createLineSegmentsGraph(vertices2d, lineSegments);
    uint32_t startIndex = 0;
    for (size_t i = 0; i < vertices2d.size(); i += 2) {
        if (vertices2d[i] < vertices2d[startIndex])
            startIndex = i;
    }
    Vector2 direction = {0, -1};
    std::vector<uint32_t> outlineIndices{startIndex};
    auto currentIndex = startIndex;
    do {
        auto it = graph.find(currentIndex);
        if (it == graph.end())
            break;
        auto &neighbors = it->second;
        if (neighbors.empty())
            break;
        if (neighbors.size() == 1) {
            currentIndex = neighbors.begin()->first;
        } else {
            auto mostRight = std::min_element(neighbors.begin(), neighbors.end(), [&outlineIndices, &direction](auto &a, auto &b) {
                if (outlineIndices.size() > 1) {
                    if (a.first == outlineIndices[outlineIndices.size() - 2])
                        return false;
                    if (b.first == outlineIndices[outlineIndices.size() - 2])
                        return true;
                }
                return directionSortKey(direction, a.second) < directionSortKey(direction, b.second);
            });
            currentIndex = mostRight->first;
        }
        if (std::find(outlineIndices.begin(), outlineIndices.end(), currentIndex) != outlineIndices.end())
            break;
        outlineIndices.push_back(currentIndex);
    }
    while (currentIndex != startIndex);
    Vertices outline2d;
    for (auto &index : outlineIndices) {
        outline2d.push_back(vertices2d[index * 2]);
        outline2d.push_back(vertices2d[index * 2 + 1]);
    }
    return outline2d;
}

OutlineConstructor::LineGraph OutlineConstructor::createLineSegmentsGraph(
        const Vertices &vertices2d,
        const LineSegments &lineSegments) {
    LineGraph graph;
    for (auto &lineSegment : lineSegments) {
        auto v0 = vertices2d.data() + lineSegment.first * 2;
        auto v1 = vertices2d.data() + lineSegment.second * 2;
        auto d = normalize2(sub2(v1, v0));
        graph[lineSegment.first][lineSegment.second] = Vector2{d[0], d[1]};
        graph[lineSegment.second][lineSegment.first] = Vector2{d[1], d[2]};
    }
    return graph;
}

float OutlineConstructor::directionSortKey(const Vector2 &direction, const Vector2 &v) {
    auto dotD = dot2(direction, v);
    auto dotN = dot2(direction, Vector2{-v[1], v[0]});
    return dotN > 0 ? 1 - dotD : dotD - 1;
}