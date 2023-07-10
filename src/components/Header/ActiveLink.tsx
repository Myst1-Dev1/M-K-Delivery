import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
    children:ReactNode;
    shouldMatchExactHref?:boolean;
    activeClassName:string
}

export function ActiveLink({children, activeClassName, ...rest}:ActiveLinkProps) {
    const { asPath } = useRouter();

    const isActive = asPath === rest.href;

    return (
        <Link {...rest}>
            <a className={isActive ? activeClassName : ''}>{children}</a>
        </Link>
    )
}