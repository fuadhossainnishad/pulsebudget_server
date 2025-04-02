export const formateDecimal = (value: string): number => {
    return parseFloat(parseInt(value).toFixed(2))
}