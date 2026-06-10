import React from 'react';
import { cn } from '../../utils/cn';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({ children, className, containerClassName }: SectionProps) {
  return (
    <section className={cn('py-20', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}