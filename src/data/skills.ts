import type { SkillGroup } from '@/types/skill'

export const SKILLS: SkillGroup[] = [
  {
    category: 'Backend',
    items: [
      { name: 'Java', iconSlug: 'openjdk' },
      { name: 'Spring Boot', iconSlug: 'springboot' },
      { name: 'JPA', iconSlug: 'hibernate' },
      { name: 'Querydsl', iconPath: '/icons/skills/querydsl.svg' },
      { name: 'MyBatis', iconPath: '/icons/skills/mybatis.svg' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'JavaScript', iconSlug: 'javascript' },
      { name: 'TypeScript', iconSlug: 'typescript' },
      { name: 'React', iconSlug: 'react' },
      { name: 'Next.js', iconSlug: 'nextdotjs' },
      { name: 'TanStack Query', iconSlug: 'reactquery' },
      { name: 'Zustand', iconPath: '/icons/skills/zustand.svg' },
      { name: 'Vue', iconSlug: 'vuedotjs' },
      { name: 'Nuxt.js', iconSlug: 'nuxt' },
      { name: 'Vuex', iconPath: '/icons/skills/vuex.svg' },
      { name: 'Tailwind CSS', iconSlug: 'tailwindcss' },
      { name: 'Web Component', iconSlug: 'webcomponentsdotorg' },
      { name: 'Vite', iconSlug: 'vite' },
      { name: 'Framer Motion', iconSlug: 'framer' },
      { name: 'Chart.js', iconSlug: 'chartdotjs' },
      { name: 'Dart', iconSlug: 'dart' },
      { name: 'Flutter', iconSlug: 'flutter' },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'MySQL', iconSlug: 'mysql' },
      { name: 'PostgreSQL', iconSlug: 'postgresql' },
      { name: 'Redis', iconSlug: 'redis' },
    ],
  },
  {
    category: 'Messaging',
    items: [{ name: 'RabbitMQ', iconSlug: 'rabbitmq' }],
  },
  {
    category: 'Realtime',
    items: [
      { name: 'Firebase Realtime Database', iconSlug: 'firebase' },
      { name: 'Firebase Cloud Messaging', iconSlug: 'firebase' },
    ],
  },
  {
    category: 'Infra',
    items: [
      { name: 'AWS', iconPath: '/icons/skills/aws.svg' },
      { name: 'Docker', iconSlug: 'docker' },
      { name: 'Jenkins', iconSlug: 'jenkins' },
      { name: 'Ubuntu', iconSlug: 'ubuntu' },
      { name: 'Vercel', iconSlug: 'vercel' },
    ],
  },
  {
    category: 'Monitoring',
    items: [
      { name: 'Prometheus', iconSlug: 'prometheus' },
      { name: 'Grafana', iconSlug: 'grafana' },
      { name: 'Pinpoint', iconPath: '/icons/skills/pinpoint.svg' },
    ],
  },
  {
    category: 'Test',
    items: [
      { name: 'JUnit5', iconSlug: 'junit5' },
      { name: 'JMeter', iconSlug: 'apachejmeter' },
      { name: 'k6', iconSlug: 'k6' },
      { name: 'Jest', iconSlug: 'jest' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'GitHub', iconSlug: 'github' },
      { name: 'Mattermost', iconSlug: 'mattermost' },
      { name: 'Claude Code', iconSlug: 'anthropic' },
      { name: 'Vimeo API', iconSlug: 'vimeo' },
    ],
  },
]
