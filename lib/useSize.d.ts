import { ObjectSize } from "./types";
declare const useSize: () => (parentSize: ObjectSize, frameObjectSize: ObjectSize, responsive: boolean, blockAtMaxSize: boolean, blockAtMinSize: boolean, minSize?: ObjectSize) => number[];
export default useSize;
