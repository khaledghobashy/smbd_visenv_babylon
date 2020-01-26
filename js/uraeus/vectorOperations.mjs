
export function Mirrored(vector)
{
    const mirrored = vector.clone()
    mirrored.y = -1 * vector.y
    return mirrored
}

export function Centered(vector1, vector2)
{
    const centered = BABYLON.Vector3.Center(vector1, vector2)
    return centered
}

export function getNormal(v1, v2, v3)
{
    var v1v2 = v1.subtract(v2);
    var v1v3 = v1.subtract(v3);
    var normal = BABYLON.Vector3.Cross(v1v2, v1v3);
    normal.normalize()
    return normal
}
