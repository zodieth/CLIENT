import * as React from 'react';
// Here we have used react-icons package for the icons
import { FaGithub, FaDev, FaLinkedin, FaQuora, FaTwitter } from 'react-icons/fa';
export const siteConfig = {
  author: {
    name: 'Matías Fiermarín',
    accounts: [
      {
        url: 'https://github.com/fiermarin2',
        label: 'Github Account',
        type: 'gray',
        icon: <FaGithub />
      },
      {
        url: 'https://www.linkedin.com/in/matias-fiermarin-torres/',
        label: 'LinkedIn Account',
        type: 'linkedin',
        icon: <FaLinkedin />
      },

    ]
  }
};
