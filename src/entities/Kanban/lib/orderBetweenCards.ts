export function orderBetween(previous?: { sort_order: number }, next?: { sort_order: number }): number {
    if (previous && next) return (previous.sort_order + next.sort_order) / 2;
    if (next) return next.sort_order - 1000;
    if (previous) return previous.sort_order + 1000;
    return 10_000;
}
