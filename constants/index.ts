import { SideBarLink } from "@/types"

export const themes = [
    {value: 'light', label: 'Light', icon: '/assets/icons/sun.svg'},
    {value: 'dark', label: 'Dark', icon: '/assets/icons/moon.svg'},
    {value: 'system', label: 'System', icon: '/assets/icons/computer.svg'}
]

export const SideBarLinks: SideBarLink[] = [
    { imgURL: '/assets/icons/home.svg', 
      route: '/', 
      label: 'Home' },
    { imgURL: '/assets/icons/users.svg', 
      route: '/community', 
      label: 'Community' },
    { imgURL: '/assets/icons/star.svg', 
      route: '/collections', 
      label: 'Collections' },
    { imgURL: '/assets/icons/suitcase.svg', 
      route: '/find-jobs', 
      label: 'Find Jobs' },
    { imgURL: '/assets/icons/tag.svg', 
      route: '/tags', 
      label: 'Tags' },
    { imgURL: '/assets/icons/question.svg', 
      route: '/ask-question', 
      label: 'Ask a Question' },
  
]

export const TopQuestions = [
    {
      _id: '1',
      title: 'What is the best way to learn React?',
      route: '/'
    },
    {
      _id: '2',
      title: 'What is the best way to learn Vue?',
      route: '/'
    },
    {
      _id: '3',
      title: 'What is the best way to learn Angular?',
      route: '/'
    },
    {
      _id: '4',
      title: 'What is the best way to learn Svelte?',
      route: '/'
    },
    {
      _id: '5',
      title: 'What is the best way to learn React Native?',
      route: '/'
    },
]

export const TopTags = [
  {
    _id: 1,
    name: 'React js',
    tatalQuestions: 5
  },
  {
    _id: 2,
    name: 'javascript',
    tatalQuestions: 5
  },
  {
    _id: 3,
    name: 'Next js',
    tatalQuestions: 5
  },
  {
    _id: 4,
    name: 'Angular',
    tatalQuestions: 5
  },
  {
    _id: 5,
    name: 'HTML',
    tatalQuestions: 5
  },
]