export const StarSvg = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="126"
            height="126"
            viewBox="0 0 126 126"
            fill="none"
        >
            <path
                id
                d="M0 6C0 2.68629 2.68629 0 6 0H120C123.314 0 126 2.68629 126 6V111C126 119.284 119.284 126 111 126H15C6.71573 126 0 119.284 0 111V6Z"
                fill="#1A1A1A"
            />
            <path
                id="bottle"
                d="M10 15C10 11.6863 12.6863 9 16 9H111C114.314 9 117 11.6863 117 15V61C117 77.0163 104.016 90 88 90H39C22.9837 90 10 77.0163 10 61V15Z"
                fill="#EDEDED"
            />
            <mask
                id="mask0"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x="10"
                y="9"
                width="107"
                height="81"
            >
                <path
                    d="M10 15C10 11.6863 12.6863 9 16 9H111C114.314 9 117 11.6863 117 15V61C117 77.0163 104.016 90 88 90H39C22.9837 90 10 77.0163 10 61V15Z"
                    fill="#EDEDED"
                />
            </mask>
            <g mask="url(#mask0)">
                <path
                    d="M42.5 58.8889C20.5 58.8889 21.5 46.4444 10 46.4444V90H120V58.8889C120 58.8889 106.5 42 87.5 42C68.5 42 64.5 58.8889 42.5 58.8889Z"
                    fill="#FE7C22"
                />
            </g>
            <path
                d="M10 93C10 91.8954 10.8954 91 12 91H15.4893C16.1447 91 16.7816 91.2166 17.3011 91.6162V91.6162C21.0765 94.5204 25.2884 96.8077 29.78 98.393L30.6029 98.6834C31.1967 98.8929 31.8217 99 32.4513 99H63H95.22C95.7366 99 96.2499 98.9167 96.74 98.7533L98.384 98.2053C102.756 96.748 106.817 94.4858 110.358 91.5354V91.5354C110.773 91.1895 111.296 91 111.836 91H115C116.105 91 117 91.8954 117 93V110C117 113.314 114.314 116 111 116H16C12.6863 116 10 113.314 10 110V93Z"
                fill="#EDEDED"
            />
        </svg>
    );
};
