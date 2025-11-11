import {type IconType} from 'react-icons';
import {FaFacebook} from 'react-icons/fa';
import {TfiLinkedin} from 'react-icons/tfi';
import {MdOutlineSendToMobile} from 'react-icons/md';
import {BsTelegram, BsGithub} from 'react-icons/bs';

/**
 * Social link item interface
 */
export interface SocialLink {
  icon: IconType;
  href: string;
  label?: string;
  ariaLabel?: string;
}

/**
 * Social media links configuration
 */
export const socialLinks: SocialLink[] = [
  {
    icon: BsGithub,
    href: 'https://github.com/nhikhongkhong',
    label: 'GitHub',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    icon: FaFacebook,
    href: 'https://www.facebook.com/R0llr0yPhAnT0m',
    label: 'Facebook',
    ariaLabel: 'Visit my Facebook profile',
  },
  {
    icon: TfiLinkedin,
    href: 'https://www.linkedin.com/feed/',
    label: 'LinkedIn',
    ariaLabel: 'Visit my LinkedIn profile',
  },
  {
    icon: MdOutlineSendToMobile,
    href: 'tel:+84978389208',
    label: 'Phone',
    ariaLabel: 'Call me',
  },
  {
    icon: BsTelegram,
    href: 'https://www.t.me/nhikhongkhong',
    label: 'Telegram',
    ariaLabel: 'Contact me on Telegram',
  },
];

/**
 * Contact email
 */
export const contactEmail = 'wutianron@gmail.com';
