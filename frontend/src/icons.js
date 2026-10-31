// Brand icons for tool chips and social links.
// To give a new tool an icon, add it here using its exact name from profile-seed.json.
import { FaJava } from 'react-icons/fa';
import {
  SiBitbucket, SiElasticsearch, SiFacebook, SiGithub, SiHibernate, SiInstagram, SiMongodb,
  SiPostgresql, SiPostman, SiPython, SiSaucelabs, SiSelenium, SiSlack, SiSpringboot,
  SiTensorflow, SiYoutube,
} from 'react-icons/si';
import { VscAzure, VscAzureDevops } from 'react-icons/vsc';
import { PiMicrosoftTeamsLogo } from 'react-icons/pi';
import {
  TbApi, TbAward, TbBackpack, TbBook, TbBrandLinkedin, TbChartCandle, TbChartLine, TbCloud, TbCode,
  TbDatabase, TbDeviceMobile, TbMicrophone, TbPlaneTilt, TbSchool, TbSparkles, TbStarFilled,
} from 'react-icons/tb';

// color: brand color, or null to use the chip's normal text color.
export const TOOL_ICONS = {
  'Java': { Icon: FaJava, color: '#E76F00' },
  'Spring Boot': { Icon: SiSpringboot, color: '#6DB33F' },
  'MongoDB': { Icon: SiMongodb, color: '#47A248' },
  'Elasticsearch': { Icon: SiElasticsearch, color: '#00BFB3' },
  'JDBC': { Icon: TbDatabase, color: null },
  'Selenium': { Icon: SiSelenium, color: '#43B02A' },
  'REST APIs': { Icon: TbApi, color: null },
  'Azure DevOps': { Icon: VscAzureDevops, color: '#2B88D8' },
  'Azure': { Icon: VscAzure, color: '#2B88D8' },
  'Bitbucket': { Icon: SiBitbucket, color: '#2684FF' },
  'Slack': { Icon: SiSlack, color: '#E01E5A' },
  'Microsoft Teams': { Icon: PiMicrosoftTeamsLogo, color: '#7B83EB' },
  'Fireflink Device Farm': { Icon: TbDeviceMobile, color: 'var(--ff)' },
  'BrowserStack': { Icon: TbCloud, color: '#F48024' },
  'Sauce Labs': { Icon: SiSaucelabs, color: '#E2231A' },
  'LambdaTest': { Icon: TbCloud, color: '#0EBAC5' },
  'Hibernate': { Icon: SiHibernate, color: '#BCAE79' },
  'PostgreSQL': { Icon: SiPostgresql, color: '#4F8CC9' },
  'Postman': { Icon: SiPostman, color: '#FF6C37' },
  'Python': { Icon: SiPython, color: '#4B8BBE' },
  'TensorFlow': { Icon: SiTensorflow, color: '#FF8F00' },
  'Yahoo Finance API': { Icon: TbChartCandle, color: '#9D6CFF' },
};

// Picks an icon by matching words in a title; the first matching rule wins.
function pickIcon(rules, text, fallback) {
  return rules.find(([pattern]) => pattern.test(text))?.[1] ?? fallback;
}

export const projectIcon = (name) => pickIcon([
  [/flight|travel|booking/i, { Icon: TbPlaneTilt, tint: '#60a5fa' }],
  [/stock|price|finance|market/i, { Icon: TbChartLine, tint: '#34d399' }],
], name, { Icon: TbCode, tint: '#f5b324' });

// Education and achievement icons each come with their own color ("tint").
export const educationIcon = (degree) => pickIcon([
  [/b\.?e\b|b\.?tech|bachelor|degree|engineering/i, { Icon: TbSchool, tint: '#f5b324' }],
  [/pre-university|\bpu\b|12th|puc/i, { Icon: TbBook, tint: '#2dd4bf' }],
  [/10th|sslc|school/i, { Icon: TbBackpack, tint: '#fb7185' }],
], degree, { Icon: TbSchool, tint: '#f5b324' });

export const achievementIcon = (text) => pickIcon([
  [/incubation|selected|award/i, { Icon: TbAward, tint: '#f5b324' }],
  [/academic|record|%|cgpa/i, { Icon: TbStarFilled, tint: '#60a5fa' }],
  [/host|event|extracurricular/i, { Icon: TbMicrophone, tint: '#fb7185' }],
], text, { Icon: TbSparkles, tint: '#2dd4bf' });

export const SOCIAL_LINKS = [
  { key: 'linkedin', label: 'LinkedIn', Icon: TbBrandLinkedin, color: '#0A66C2' },
  { key: 'github', label: 'GitHub', Icon: SiGithub, color: null },
  { key: 'instagram', label: 'Instagram', Icon: SiInstagram, color: '#E4405F' },
  { key: 'youtube', label: 'YouTube', Icon: SiYoutube, color: '#FF0000' },
  { key: 'facebook', label: 'Facebook', Icon: SiFacebook, color: '#0866FF' },
];
