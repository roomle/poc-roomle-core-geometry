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
    SECTION("triangles") {
        vertices3d = {
                -1, -1, 0, 1, -1, 0, 0, 1, 0,
                -1, 1, 0, 0, -1, 0, 1, 1, 0,
        };
        triangleIndices = {
                0, 1, 2, 3, 4, 5,
        };
        planeNormal = {0, 0, -1};
        planeUp = {0, 1, 0};
        expectedOutline = {-1, -1, -0.5, 0, -1, 1, 0, 1, 1, 1, 0.5, 0, 1, -1, 0, -1, };
    }
    SECTION("cube") {
        vertices3d = {
                0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5,
                -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5,
                -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
                -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
                -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
                0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
        };
        triangleIndices = {
                0, 2, 1, 2, 3, 1,
                4, 6, 5, 6, 7, 5,
                8, 10, 9, 10, 11,
                9, 12, 14, 13, 14,
                15, 13, 16, 18, 17,
                18, 19, 17, 20, 22,
                21, 22, 23, 21
        };
        SECTION("front") {
            planeNormal = {0, 0, -1};
            planeUp = {0, 1, 0};
            expectedOutline = {-0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, };
        }
        SECTION("diagonal xy edge") {
            planeNormal = {1, 0, -1};
            planeUp = {0, 1, 0};
            expectedOutline = {-0.707107, 0.5, 0, 0.5, 0.707107, 0.5, 0.707107, -0.5, 0, -0.5, -0.707107, -0.5, };
        }
        SECTION("diagonal xy") {
            planeNormal = {-1, 0, 0.5};
            planeUp = {0, 1, 0};
            expectedOutline = {-0.67082, 0.5, -0.223607, 0.5, 0.223607, 0.5, 0.67082, 0.5, 0.67082, -0.5, 0.223607, -0.5, -0.223607, -0.5, -0.67082, -0.5, };
        }
        SECTION("diagonal to corner") {
            planeNormal = {1, 1, 1};
            planeUp = {0, 1, 0};
            expectedOutline = {-0.707107, 0.408248, 0, 0.816497, 0.707107, 0.408248, 0.707107, -0.408248, 0, -0.816497, -0.707107, -0.408248, };
        }
        SECTION("diagonal") {
            planeNormal = {-0.4, 0.3, -0.2};
            planeUp = {0, 1, 0};
            expectedOutline = {-0.67082, 0.290659, -0.223607, 0.788932, 0.67082, 0.539796, 0.67082, -0.290659, 0.223607, -0.788932, -0.67082, -0.539796, };
        }
    }
    SECTION("cube") {
        vertices3d = {
                0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,-0.7071,0.7071,0,-0.5,0.7071,0.5,0,0.7071,0.7071,
                0.5,0.7071,0.5,0.7071,0.7071,0,0.5,0.7071,-0.5,0,0.7071,-0.7071,-0.5,0.7071,-0.5,-0.7071,0.7071,0,-1,0,
                0,-0.7071,0,0.7071,0,0,1,0.7071,0,0.7071,1,0,0,0.7071,0,-0.7071,0,0,-1,-0.7071,0,-0.7071,-1,0,0,-0.7071,
                -0.7071,0,-0.5,-0.7071,0.5,0,-0.7071,0.7071,0.5,-0.7071,0.5,0.7071,-0.7071,0,0.5,-0.7071,-0.5,0,-0.7071,
                -0.7071,-0.5,-0.7071,-0.5,-0.7071,-0.7071,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0
        };
        triangleIndices = {
                0,9,10,1,10,11,2,11,12,3,12,13,4,13,14,5,14,15,6,15,16,7,16,17,10,9,19,9,18,19,11,10,20,10,19,20,12,11,
                21,11,20,21,13,12,22,12,21,22,14,13,23,13,22,23,15,14,24,14,23,24,16,15,25,15,24,25,17,16,26,16,25,26,
                19,18,28,18,27,28,20,19,29,19,28,29,21,20,30,20,29,30,22,21,31,21,30,31,23,22,32,22,31,32,24,23,33,23,
                32,33,25,24,34,24,33,34,26,25,35,25,34,35,28,27,37,29,28,38,30,29,39,31,30,40,32,31,41,33,32,42,34,33,
                43,35,34,44,
        };
        SECTION("front") {
            planeNormal = {0, 0, -1};
            planeUp = {0, 1, 0};
            expectedOutline = {-1, 0, -0.7071, 0.7071, 0, 1, 0.7071, 0.7071, 1, 0, 0.7071, -0.7071, 0, -1, -0.7071, -0.7071, };
        }
        SECTION("diagonal") {
            planeNormal = {0.2, 0.3, 0.4};
            planeUp = {0, 1, 0};
            expectedOutline = {
                    -0.948674, 0.176164, -0.67082, 0.711783, -0.316225, 0.939543, 0.223607, 0.960919, 0.632449,
                    0.763379, 0.894427, 0.249136, 0.948674, -0.176164, 0.67082, -0.711783, 0.316225, -0.939543,
                    -0.223607, -0.960919, -0.632449, -0.763379, -0.894427, -0.249136,
            };
        }
    }

    const float epsilon = 0.0001f;
    auto constructor = roomle::mesh::OutlineConstructor::fromSingleMesh(vertices3d, triangleIndices, epsilon);
    auto actualOutline = constructor.create2dOutline(planeNormal, planeUp);
#define OUTLINE_DEBUG_OUTPUT
#ifdef OUTLINE_DEBUG_OUTPUT
    std::cout << "(" << actualOutline.size() << ") {";
    for (auto i: actualOutline)
        std::cout << i << ", ";
    std::cout << "}" << std::endl;
#endif
    REQUIRE(actualOutline.size() == expectedOutline.size());
    for (size_t i = 0; i < actualOutline.size(); ++i) {
        REQUIRE(std::fabs(actualOutline[i] - expectedOutline[i]) < epsilon);
    }
}