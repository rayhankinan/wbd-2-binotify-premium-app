function pad(n: string, width: number, z: string) {
z = z || '0';
n = n + '';
return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export const formatSeconds = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${pad((seconds % 60).toString(), 2, '0')}`
}