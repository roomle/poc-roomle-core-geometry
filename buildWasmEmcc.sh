source="src/wasm"
emscripten_folder="/Users/$USER/source/emscripten/emsdk/upstream/emscripten"

mkdir ./buildWasmEmcc

$emscripten_folder/emcc \
    $source/mesh_utility/constructiveSolidGeometry.cpp \
    $source/mesh_utility/meshIntersection.cpp \
    $source/mesh_utility/meshMath.cpp \
    $source/mesh_utility/meshSpecification.cpp \
    $source/mesh_utility/outlineConstruction.cpp \
    $source/meshUtilityEmbind.cpp \
    -I$source/mesh_utility \
    -I$source \
    -o buildWasmEmcc/MeshUtility.js \
    -s WASM=1 \
    --bind \
    -s ENVIRONMENT=web \
    -s MODULARIZE=1 \
    -s EXPORT_NAME="MeshUtility" \
    -lnodefs.js \
    -fwasm-exceptions
    
