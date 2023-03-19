import { ReactElement } from 'react'

const iconsPaths = {
  plus: (
    <>
      <path
        id="plus"
        d="M12 4V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        id="plus"
        d="M4 12L20 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  calendar: (
    <>
      <path
        id="calendar"
        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="calendar"
        d="M16 2V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="calendar"
        d="M8 2V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="calendar"
        d="M3 10H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  archive: (
    <path
      id="archive"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.0418 6.68208C15.7071 5.28886 13.8303 4.42285 11.75 4.42285C7.70347 4.42285 4.4231 7.70323 4.4231 11.7498C4.4231 15.7963 7.70347 19.0767 11.75 19.0767C15.7966 19.0767 19.0769 15.7963 19.0769 11.7498H20.5769C20.5769 16.6248 16.625 20.5767 11.75 20.5767C6.87504 20.5767 2.9231 16.6248 2.9231 11.7498C2.9231 6.8748 6.87504 2.92285 11.75 2.92285C14.256 2.92285 16.5191 3.96813 18.1249 5.64444C18.4747 6.00955 18.7935 6.40474 19.0769 6.82581V3.67285C19.0769 3.25864 19.4127 2.92285 19.8269 2.92285C20.2412 2.92285 20.5769 3.25864 20.5769 3.67285V9.05747V9.80747H19.8269H13.5449C13.1307 9.80747 12.7949 9.47168 12.7949 9.05747C12.7949 8.64325 13.1307 8.30747 13.5449 8.30747H18.2198C17.9023 7.71221 17.5049 7.16559 17.0418 6.68208Z"
      fill="currentColor"
    />
  ),
  trash: (
    <path
      id="trash"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.4798 1.00021L10.371 1.00011C9.85842 0.99934 9.40851 0.998668 9.00762 1.15634C8.65709 1.2942 8.34677 1.51786 8.10513 1.80682C7.82878 2.13727 7.68715 2.56431 7.52577 3.05085L7.49147 3.1541L7.20943 4.00021H3.75H1.75C1.33579 4.00021 1 4.336 1 4.75021C1 5.16443 1.33579 5.50021 1.75 5.50021H3.04282L3.59024 14.8063L3.59177 14.8324C3.65335 15.8792 3.70168 16.7009 3.78388 17.3649C3.8676 18.0411 3.99147 18.6031 4.22666 19.1224C4.85057 20.5 5.99212 21.5764 7.40402 22.1183C7.93623 22.3226 8.50449 22.4133 9.1845 22.4572C9.85218 22.5002 10.6753 22.5002 11.7239 22.5002H11.75H11.7761C12.8247 22.5002 13.6478 22.5002 14.3155 22.4572C14.9955 22.4133 15.5638 22.3226 16.096 22.1183C17.5079 21.5764 18.6494 20.5 19.2733 19.1224C19.5085 18.6031 19.6324 18.0411 19.7161 17.3649C19.7983 16.7009 19.8467 15.8792 19.9082 14.8324L19.9098 14.8063L20.4572 5.50021H21.75C22.1642 5.50021 22.5 5.16443 22.5 4.75021C22.5 4.336 22.1642 4.00021 21.75 4.00021H19.75H16.2906L16.0085 3.1541L15.9742 3.05084C15.8129 2.5643 15.6712 2.13727 15.3949 1.80682C15.1532 1.51786 14.8429 1.2942 14.4924 1.15634C14.0915 0.998668 13.6416 0.99934 13.129 1.00011L13.0202 1.00021H10.4798ZM15.7325 5.50021C15.7441 5.50048 15.7557 5.50049 15.7673 5.50021H18.9546L18.4123 14.7183C18.3489 15.7967 18.303 16.5702 18.2275 17.1806C18.1528 17.7842 18.0541 18.1787 17.9069 18.5036C17.4458 19.5218 16.602 20.3174 15.5585 20.718C15.2256 20.8457 14.8259 20.9211 14.2189 20.9603C13.6052 20.9999 12.8303 21.0002 11.75 21.0002C10.6697 21.0002 9.89481 20.9999 9.28105 20.9603C8.67408 20.9211 8.27444 20.8457 7.94154 20.718C6.89797 20.3174 6.05421 19.5218 5.59306 18.5036C5.44595 18.1787 5.34724 17.7842 5.27252 17.1806C5.19695 16.5702 5.15109 15.7967 5.08765 14.7183L4.54541 5.50021H7.7327C7.74433 5.50049 7.75594 5.50048 7.76751 5.50021H15.7325ZM14.7094 4.00021L14.5855 3.62844C14.3686 2.97761 14.3133 2.85174 14.2442 2.76908C14.1637 2.67276 14.0602 2.59821 13.9434 2.55225C13.8431 2.51282 13.7062 2.50021 13.0202 2.50021H10.4798C9.79379 2.50021 9.65691 2.51282 9.55663 2.55225C9.43979 2.59821 9.33635 2.67276 9.2558 2.76908C9.18668 2.85174 9.13144 2.97761 8.91449 3.62844L8.79057 4.00021H14.7094ZM10.5 9.75021C10.5 9.336 10.1642 9.00021 9.75 9.00021C9.33579 9.00021 9 9.336 9 9.75021V16.7502C9 17.1644 9.33579 17.5002 9.75 17.5002C10.1642 17.5002 10.5 17.1644 10.5 16.7502V9.75021ZM13.75 9.00021C14.1642 9.00021 14.5 9.336 14.5 9.75021V16.7502C14.5 17.1644 14.1642 17.5002 13.75 17.5002C13.3358 17.5002 13 17.1644 13 16.7502V9.75021C13 9.336 13.3358 9.00021 13.75 9.00021Z"
      fill="currentColor"
    />
  ),
  sorting: (
    <path
      id="sorting"
      d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  folderPlus: (
    <>
      <path
        id="folderPlus"
        d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="folderPlus"
        d="M12 11V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="folderPlus"
        d="M9 14H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  folder: (
    <path
      id="folder"
      d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  play: (
    <path
      id="play"
      d="M4 12V8.44C4 6.25567 4.27961 4.11498 5.51518 3.3757C6.77979 2.61903 9.02276 3.30217 10.96 4.42L14.05 6.2L17.14 7.98C19.055 9.085 20.3048 10.5425 20.3048 12C20.3048 13.4575 19.055 14.915 17.14 16.02L14.05 17.8L10.96 19.58C8.6983 20.8851 6.37102 21.1818 5.09792 19.9735C4.21513 19.1357 4 17.3699 4 15.56V12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  stop: (
    <path
      id="stop"
      d="M8.31274 6V18M15.4872 6V18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  ),
  close: (
    <>
      <path
        id="close"
        d="M6.4043 6.28259L17.5956 17.7174"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        id="close"
        d="M6.28259 17.5957L17.7174 6.40435"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  chevronLeft: (
    <path
      id="chevronLeft"
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  done: (
    <path
      id="done"
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  headerLogo: (
    <path
      id="headerLogo"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.23658 0.015017C6.23838 0.0692971 5.25815 0.323598 4.34092 0.766258C3.57532 1.13575 2.92206 1.59479 2.31275 2.19146C1.89438 2.60113 1.61132 2.93894 1.30409 3.39512C0.586508 4.46066 0.166572 5.63479 0.0296514 6.9585C0.00142523 7.23129 0 7.66861 0 16.0161C0 24.3636 0.00142523 24.8009 0.0296514 25.0737C0.195372 26.6758 0.781143 28.0675 1.81165 29.3077C1.98723 29.519 2.50876 30.0403 2.71941 30.2151C3.3859 30.7682 4.08107 31.1836 4.84088 31.4828C5.44238 31.7196 5.93576 31.8486 6.68386 31.9647C6.85177 31.9907 7.4795 31.993 15.8905 31.9983C22.6335 32.0025 24.9688 31.9992 25.1218 31.985C26.9309 31.8176 28.7319 30.9221 29.9738 29.5723C31.1074 28.3403 31.7896 26.8502 31.9771 25.1965C32.0005 24.9893 32.0026 24.0952 31.9981 15.9178C31.9934 7.34869 31.9916 6.85798 31.964 6.67186C31.8888 6.16367 31.7568 5.61009 31.6087 5.18137C31.0154 3.46434 29.8344 2.01205 28.2753 1.08236C27.2063 0.444835 26.0215 0.0863313 24.745 0.0140998C24.4024 -0.00527658 7.59379 -0.0044085 7.23658 0.015017ZM17.5779 4.06688C18.1131 4.11562 18.553 4.18289 19.0359 4.28983C22.2067 4.992 24.9187 7.0513 26.4439 9.91491C26.866 10.7074 27.1894 11.5474 27.4077 12.4179C27.4979 12.7781 27.5998 13.2819 27.6211 13.4733L27.6325 13.5757L25.4969 13.5716L23.3613 13.5674L23.3081 13.3709C22.9911 12.1992 22.4157 11.1836 21.5833 10.3265C19.8617 8.55388 17.3338 7.84362 14.9234 8.45531C14.3297 8.60598 13.6406 8.89284 13.1138 9.20858L12.909 9.33133L12.9048 7.01885C12.9025 5.74699 12.9039 4.6976 12.908 4.68686C12.9245 4.64349 13.7459 4.40049 14.2488 4.29017C14.8821 4.15128 15.3447 4.08984 16.1608 4.03622C16.3669 4.02267 17.3187 4.04326 17.5779 4.06688ZM9.72272 11.6893C9.72272 14.5615 9.72763 18.0625 9.73363 19.4694L9.74452 22.0272H12.6497H15.5548L15.5507 24.1278L15.5465 26.2284H10.5418H5.53712L5.5321 20.6432C5.52689 14.8387 5.52858 14.6622 5.59568 14.0016C5.85358 11.4627 6.97652 9.10097 8.78894 7.28565C9.11893 6.95516 9.66739 6.46713 9.70886 6.46713C9.71647 6.46713 9.72272 8.81711 9.72272 11.6893ZM27.6282 16.7659C27.6282 16.8053 27.537 17.2906 27.4874 17.5148C26.9201 20.0804 25.4551 22.3739 23.3689 23.9626C22.3773 24.7178 21.2908 25.2888 20.1076 25.6767C19.648 25.8274 18.889 26.0237 18.7659 26.0237C18.7329 26.0237 18.7328 26.0188 18.7328 23.8638V21.7039L18.9089 21.6417C20.6142 21.039 22.0069 19.8158 22.8094 18.2161C22.9866 17.8631 23.1915 17.3215 23.2963 16.9292L23.3434 16.7532H25.4858C26.6641 16.7532 27.6282 16.7589 27.6282 16.7659Z"
      fill="currentColor"
    />
  ),
}

export interface IconPathProps extends ReactElement<SVGGraphicsElement> {
  id: string
  children?: ReactElement<SVGGraphicsElement>[]
}

export type IconPathsType = typeof iconsPaths

export default iconsPaths
