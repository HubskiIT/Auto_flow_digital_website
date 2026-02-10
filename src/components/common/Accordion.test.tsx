import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Accordion from './Accordion';
import { FaqItem } from '../../../types';

const mockItems: FaqItem[] = [
    { question: 'Question 1', answer: 'Answer 1' },
    { question: 'Question 2', answer: 'Answer 2' },
];

describe('Accordion', () => {
    it('renders all questions', () => {
        render(<Accordion items={mockItems} />);

        mockItems.forEach(item => {
            expect(screen.getByText(item.question)).toBeInTheDocument();
        });
    });

    it('toggles answer visibility on click', async () => {
        const user = userEvent.setup();
        render(<Accordion items={mockItems} />);

        const answer1 = screen.getByText('Answer 1');
        expect(answer1).toBeInTheDocument();
        expect(answer1).not.toHaveClass('open');

        // Click first question
        await user.click(screen.getByText('Question 1'));

        expect(answer1).toHaveClass('open');

        // Click again to close
        await user.click(screen.getByText('Question 1'));
        expect(answer1).not.toHaveClass('open');
    });

    it('only allows one item open at a time', async () => {
        const user = userEvent.setup();
        render(<Accordion items={mockItems} />);

        const answer1 = screen.getByText('Answer 1');
        const answer2 = screen.getByText('Answer 2');

        // Open first
        await user.click(screen.getByText('Question 1'));
        expect(answer1).toHaveClass('open');
        expect(answer2).not.toHaveClass('open');

        // Open second
        await user.click(screen.getByText('Question 2'));
        expect(answer1).not.toHaveClass('open');
        expect(answer2).toHaveClass('open');
    });
});
