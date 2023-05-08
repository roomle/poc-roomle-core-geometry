#include "mesh_utility/outlineConstruction.h"
#include "catch2/catch.hpp"
#include <cmath>
#include <iostream>
#include <vector>

TEST_CASE("2d outline construction") {
    std::vector<float> vertices3d;
    std::vector<uint32_t> triangleIndices;
    roomle::mesh::Vector3 planeNormal, planeUp;
    std::vector<float> expectedOutline;
    SECTION("cube") {
        vertices3d = {
                -1, -1, -1,
                 1, -1, -1,
                -1,  1, -1,
                 1,  1, -1,
                -1, -1,  1,
                 1, -1,  1,
                -1,  1,  1,
                 1,  1,  1,
        };
        triangleIndices = {
                0, 1, 2, 0, 2, 3,
                2, 3, 7, 2, 7, 5,
                5, 7, 4, 5, 4, 6,
                5, 4, 1, 5, 1, 0,
                1, 4, 6, 1, 4, 3,
                5, 0, 3, 5, 3, 6,
        };
        SECTION("front") {
            planeNormal = {0, 0, 1};
            planeUp = {0, 1, 0};
            expectedOutline = {
                    -1, -1,
                     1, -1,
                     1,  1,
                    -1,  1,
            };
        }
    }
    const float epsilon = 0.0001f;
    auto constructor = roomle::mesh::OutlineConstructor::fromSingleMesh(vertices3d, triangleIndices, epsilon);
    auto actualOutline = constructor.create2dOutline(planeNormal, planeUp);
    REQUIRE(actualOutline.size() == expectedOutline.size());
    for (size_t i = 0; i < actualOutline.size(); ++i) {
        REQUIRE(std::fabs(actualOutline[i] == expectedOutline[i]) < epsilon);
    }
}