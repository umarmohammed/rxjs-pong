import { interval, share } from "rxjs";

export const loop$ = interval(20).pipe(share());
