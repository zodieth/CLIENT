import * as React from 'react';
// Here we have used react-icons package for the icons
import { FaGithub, FaDev, FaLinkedin, FaQuora, FaTwitter } from 'react-icons/fa';
export const siteConfig = {
  author: {
    name: 'Lourdes Rosa',
    accounts: [
      {
        url: 'https://github.com/LourdesRosa1',
        label: 'Github Account',
        type: 'gray',
        icon: <FaGithub />
      },
      {
        url: 'https://www.linkedin.com/in/lourdes-rosa-5a3a3b190/',
        label: 'LinkedIn Account',
        type: 'linkedin',
        icon: <FaLinkedin />
      },

    ]
  }
};
