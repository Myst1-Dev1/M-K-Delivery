import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom";
import { ActiveLink } from './ActiveLink'
import styles from './styles.module.scss';

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
});

describe('Active link components', () => {

    it ('renders correctly', () => {
        render(
            <ActiveLink activeClassName={styles.active} href="/" passHref legacyBehavior>
                Início
            </ActiveLink>
        )

        expect(screen.getByText('Início')).toBeInTheDocument();
    })

    it('adds active class if the link is currently active', () => {
        render(
            <ActiveLink activeClassName={styles.active} href="/" passHref legacyBehavior>
                Início
            </ActiveLink>
        )

        expect(screen.getByText('Início')).toHaveClass('active');
    })
})