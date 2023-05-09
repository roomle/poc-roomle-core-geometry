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
    Indices provokingTriangleIndexMap(vertices3d.size() / 3, 0);
    Indices uniqueIndexMap;
    for (uint32_t i = 0; i < vertices3d.size() / 3; ++i) {
        auto nextIndex = uniqueIndices.getNextIndex();
        auto uniqueIndex = uniqueIndices.getVertexIndex(vertices3d.data() + i * 3, epsilon);
        if (uniqueIndex == nextIndex)
            uniqueIndexMap.push_back(i);
        provokingTriangleIndexMap[i] = uniqueIndexMap[uniqueIndex];
    };
    Indices provokingTriangleIndices(triangleIndices.size(), 0);
    std::transform(triangleIndices.begin(), triangleIndices.end(), provokingTriangleIndices.begin(), [&provokingTriangleIndexMap](uint32_t index) {
        return provokingTriangleIndexMap[index];
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
    intersect2dLineSegments(vertices2d, uniqueLineSegments);
    Vertices outline2d = createOutlineFromLineSegments(vertices2d, uniqueLineSegments);
    return outline2d;
}

std::vector<float> OutlineConstructor::projectVerticesToPlane(
        const Vector3 &planeNormal,
        const Vector3 &planeUp) const {
    auto zAxis = normalize3(multiply3scalar(planeNormal, -1));
    auto yAxis = normalize3(planeUp);
    auto xAxis = normalize3(cross3(yAxis, zAxis));
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

void OutlineConstructor::intersect2dLineSegments(Vertices &vertices2d, LineSegments &lineSegments) const {
    for (uint32_t segmentIndex = 0; segmentIndex < lineSegments.size(); ++segmentIndex) {
        for (uint32_t vertexIndex = 0; vertexIndex < vertices2d.size() / 2; ++vertexIndex) {
            auto vertex = vertices2d.data() + vertexIndex * 2;
            if (vertexIndex == lineSegments[segmentIndex].first || vertexIndex == lineSegments[segmentIndex].second)
                continue;
            auto segmentStart = vertices2d.data() + lineSegments[segmentIndex].first * 2;
            auto segmentEnd = vertices2d.data() + lineSegments[segmentIndex].second * 2;
            if (isPointOnLineSegment2D(vertex, segmentStart, segmentEnd, epsilon)) {
                lineSegments.emplace_back(vertexIndex, lineSegments[segmentIndex].second);
                lineSegments[segmentIndex].second = vertexIndex;
            }
        }
    }
    for (uint32_t segmentIndexA = 0; segmentIndexA < lineSegments.size(); ++segmentIndexA) {
        for (uint32_t segmentIndexB = segmentIndexA+1; segmentIndexB < lineSegments.size(); ++segmentIndexB) {
            auto startA = lineSegments[segmentIndexA].first;
            auto endA = lineSegments[segmentIndexA].second;
            auto startB = lineSegments[segmentIndexB].first;
            auto endB = lineSegments[segmentIndexB].second;
            if (startA == startB || startA == endB || endA == startB || endA == endB)
                continue;
            auto segmentAStart = vertices2d.data() + startA * 2;
            auto segmentAEnd = vertices2d.data() + endA * 2;
            auto segmentBStart = vertices2d.data() + startB * 2;
            auto segmentBEnd = vertices2d.data() + endB * 2;
            auto intersection = findIntersection(segmentAStart, segmentAEnd, segmentBStart, segmentBEnd, epsilon);
            if (!intersection)
                continue;
            auto intersectionIndex = vertices2d.size() / 2;
            vertices2d.push_back((*intersection)[0]);
            vertices2d.push_back((*intersection)[1]);
            lineSegments.emplace_back(endA, intersectionIndex);
            lineSegments[segmentIndexA].second = intersectionIndex;
            lineSegments.emplace_back(endB, intersectionIndex);
            lineSegments[segmentIndexB].second = intersectionIndex;
        }
    }
}

OutlineConstructor::Vertices OutlineConstructor::createOutlineFromLineSegments(
        const Vertices &vertices2d,
        const LineSegments &lineSegments) {
    auto graph = createLineSegmentsGraph(vertices2d, lineSegments);
    uint32_t startIndex = 0;
    for (size_t i = 0; i < vertices2d.size() / 2; ++i) {
        if (vertices2d[i*2] < vertices2d[startIndex*2])
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
        auto mostRightIt = neighbors.begin();
        if (neighbors.size() > 1) {
            mostRightIt = std::min_element(neighbors.begin(), neighbors.end(), [&outlineIndices, &direction](auto &a, auto &b) {
                if (outlineIndices.size() > 1) {
                    if (a.first == outlineIndices[outlineIndices.size() - 2])
                        return false;
                    if (b.first == outlineIndices[outlineIndices.size() - 2])
                        return true;
                }
                return directionSortKey(direction, a.second) < directionSortKey(direction, b.second);
            });
        }
        currentIndex = mostRightIt->first;
        direction = mostRightIt->second;
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
        graph[lineSegment.second][lineSegment.first] = Vector2{-d[0], -d[1]};
    }
    return graph;
}

float OutlineConstructor::directionSortKey(const Vector2 &direction, const Vector2 &v) {
    auto dotD = dot2(direction, v);
    auto dotN = dot2(direction, Vector2{-v[1], v[0]});
    return dotN > 0 ? 1 - dotD : dotD - 1;
}

bool OutlineConstructor::isPointOnLineSegment2D(const float p[], const float a[], const float b[], float epsilon) {
    auto ab = sub2(b, a);
    auto ap = sub2(p, a);
    auto bp = sub2(p, b);
    auto abAp = dot2(ab, ap);
    auto abBp = dot2(ab, bp);
    if (abAp <= 0 || abBp >= 0)
        return false;
    auto nv = normalize2(Coordinates2{-ab[1], ab[0]});
    auto nvAp = dot2(nv, ap);
    return std::fabs(nvAp) < epsilon;
}

std::optional<Vector2> OutlineConstructor::findIntersection(const float a0[], const float a1[], const float b0[], const float b1[], float epsilon) {
    auto p = Coordinates2{a0[0], a0[1]};
    auto r = sub2(a1, a0);
    auto q = Coordinates2{b0[0], b0[1]};
    auto s = sub2(b1, b0);
    auto sn = Coordinates2{s[1], -s[0]};
    if (std::fabs(dot2(r, sn)) < epsilon)
        return std::nullopt;
    auto t = dot2(sub2(q, p), sn) / dot2(r, sn);
    auto u = dot2(sub2(q, p), Coordinates2{r[1], -r[0]}) / dot2(r, sn);
    if (t <= 0 || t >= 1 || u <= 0 || u >= 1)
        return std::nullopt;
    auto x = add2(p, multiply2scalar(r, t));
    return x;
}