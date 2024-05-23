const Close = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path
          d="M1195 4036 c-40 -17 -95 -72 -111 -113 -19 -43 -18 -125 1 -171 11
-25 195 -216 593 -614 l577 -578 -582 -582 c-633 -635 -609 -607 -601 -718 8
-105 83 -180 188 -188 111 -8 83 -32 718 601 l582 581 583 -581 c634 -633 606
-609 717 -601 105 8 180 83 188 188 8 111 32 83 -601 718 l-581 582 581 583
c633 634 609 606 601 717 -8 105 -83 180 -188 188 -111 8 -83 32 -718 -601
l-582 -582 -578 577 c-398 398 -589 582 -614 593 -45 18 -132 19 -173 1z"
        />
      </g>
    </svg>
  );
};

export default Close;