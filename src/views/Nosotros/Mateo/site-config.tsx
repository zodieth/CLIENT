import * as React from 'react';
// Here we have used react-icons package for the icons
import { FaGithub, FaDev, FaLinkedin, FaQuora, FaTwitter } from 'react-icons/fa';
export const siteConfig = {
  author: {
    name: 'Mateo Iglesias',
    accounts: [
      {
        url: 'https://github.com/zodieth',
        label: 'Github Account',
        type: 'gray',
        icon: <FaGithub />
      },
      {
        url: 'https://www.linkedin.com/in/mateo-iglesias-b49041239/',
        label: 'LinkedIn Account',
        type: 'linkedin',
        icon: <FaLinkedin />
      },

    ]
  }
};
