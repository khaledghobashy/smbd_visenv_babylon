
export function Mirrored(vector)
{
    const mirrored = vector.scale(-1)
    return mirrored
}

export function getNormal(v1, v2, v3)
{
    var v1v2 = v1.subtract(v2);
    var v1v3 = v1.subtract(v3);
    var normal = BABYLON.Vector3.Cross(v1v2, v1v3);
    normal.normalize()
    return normal
}
