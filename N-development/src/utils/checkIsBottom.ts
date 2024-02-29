export const checkIsBottom = ((prevScrollHeight?: number) => (node: HTMLDivElement, onReached: (isBottom: boolean) => void, tolerance = 20) => {
    const {scrollHeight, scrollTop, clientHeight} = node;
    const isBottom =
        scrollHeight - (scrollTop + tolerance) <= clientHeight;
    console.log(`isBottom ${isBottom} scrollHeight ${scrollHeight} scrollTop ${scrollTop} clientHeight ${clientHeight}`);
    if (isBottom && prevScrollHeight !== node.scrollHeight) {
        prevScrollHeight = node.scrollHeight;
    }
    onReached(isBottom);
})()
