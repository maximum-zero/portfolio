import type { SkillGroup } from '@/types/skill'

export const SKILLS: SkillGroup[] = [
  {
    category: 'Backend',
    items: [
      { name: 'Java',        iconSlug: 'java' },
      { name: 'Spring Boot', iconSlug: 'springboot' },
      { name: 'JPA',         iconSlug: 'hibernate' },
      { name: 'Querydsl' },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'MySQL',      iconSlug: 'mysql' },
      { name: 'PostgreSQL', iconSlug: 'postgresql' },
      { name: 'Redis',      iconSlug: 'redis' },
    ],
  },
  {
    category: 'Infra',
    items: [
      { name: 'AWS',     iconSlug: 'amazonaws' },
      { name: 'Docker',  iconSlug: 'docker' },
      { name: 'Jenkins', iconSlug: 'jenkins' },
    ],
  },
  {
    category: 'Messaging',
    items: [{ name: 'RabbitMQ', iconSlug: 'rabbitmq' }],
  },
  {
    category: 'Monitoring',
    items: [
      { name: 'Prometheus', iconSlug: 'prometheus' },
      { name: 'Grafana',    iconSlug: 'grafana' },
    ],
  },
  {
    category: 'Test',
    items: [
      { name: 'JUnit5' },
      { name: 'TestContainers' },
      { name: 'k6', iconSlug: 'k6' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React',      iconSlug: 'react' },
      { name: 'Vue',        iconSlug: 'vuedotjs' },
      { name: 'Next.js',    iconSlug: 'nextdotjs' },
      { name: 'TypeScript', iconSlug: 'typescript' },
    ],
  },
]
