#ifndef __OUTLINE_CONSTRUCTION_H__
#define __OUTLINE_CONSTRUCTION_H__

#include "mesh_utility/meshMath.h"
#include <cstdint>
#include <tuple>
#include <map>
#include <set>
#include <vector>

namespace roomle::mesh {

    class OutlineConstructor {
    public:
        using Vertices = std::vector<float>;
        using Normals = std::vector<float>;
        using Indices = std::vector<uint32_t>;
        using LineSegment = std::pair<uint32_t, uint32_t>;
        using LineSegments = std::vector<LineSegment>;
        using LineGraph = std::map<uint32_t, std::map<uint32_t, Vector2>>;

    private:
        float epsilon;
        Vertices vertices3d;
        Indices uniqueTriangleIndices;

    public:
        static OutlineConstructor fromSingleMesh(const Vertices &vertices3d, const Indices &triangleIndices, float epsilon = 0.0001f);
        OutlineConstructor(const Vertices &vertices3d, const Indices &uniqueTriangleIndices, float epsilon = 0.0001f);
        [[nodiscard]] Vertices create2dOutline(const Vector3 &planeNormal, const Vector3 &planeUp) const;

    private:
        [[nodiscard]] Vertices projectVerticesToPlane(const Vector3 &planeNormal, const Vector3 &planeUp) const;
        static Normals calculateTriangleNormalVectors(const Vertices &vertices, const Indices &triangleIndices);
        static LineSegments identifyOutlineCandidates(const Indices &triangleIndices, const Normals &normals);
        [[nodiscard]] std::tuple<Vertices, LineSegments> createUnique2dSegments(const Vertices &projectedVertices, const LineSegments &outlineCandidates) const;
        static Vertices createOutlineFromLineSegments(const Vertices &vertices2d, const LineSegments &lineSegments);
        static LineGraph createLineSegmentsGraph(const Vertices &vertices2d, const LineSegments &lineSegments);
        static float directionSortKey(const Vector2 &direction, const Vector2 &v);
    };
}

#endif