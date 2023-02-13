import * as React from 'react';
// Here we have used react-icons package for the icons
import { FaGithub, FaDev, FaLinkedin, FaQuora, FaTwitter } from 'react-icons/fa';
export const siteConfig = {
  author: {
    name: 'Juan Leiton',
    accounts: [
      {
        url: 'https://github.com/juanleiton',
        label: 'Github Account',
        type: 'gray',
        icon: <FaGithub />
      },
      {
        url: 'https://www.linkedin.com/in/juan-leiton-ba3582214/',
        label: 'LinkedIn Account',
        type: 'linkedin',
        icon: <FaLinkedin />
      },

    ]
  }
};
