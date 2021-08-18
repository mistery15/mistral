import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

//! Simple example of UT testing a component, a rather simple one due to lack of mocking but useful anyways.
//! I highly dislike snapshot testing and I think integrating storybook and snapshoting components with chromium provides better results
//! so I won't be snapshotting any components
describe('Button', () => {
    const clickFn = jest.fn();
    let button: HTMLElement | null;
    beforeEach(() => {
        render(<Button type="reset" border="normal-border" color="transparent" size="large" testId="button-test" onClick={clickFn}> Test button </Button>);
        button = screen.queryByTestId('button-test');
    });

    it('has appropriate text', () => {
        expect(button).toHaveTextContent('Test button');
    });

    it('clicking works properly', () => {
        button?.click();
        expect(clickFn).toHaveBeenCalled();
    });

    it('size works properly', () => {
        expect(button).toHaveClass('large');
    });

    it('size works properly', () => {
        expect(button).toHaveClass('transparent');
    });

    it('border works properly', () => {
        expect(button).toHaveClass('normal-border');
    });

    it('type works properly', () => {
        expect(button).toHaveAttribute('type', 'reset');
    });
});