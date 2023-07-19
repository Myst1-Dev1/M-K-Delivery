import { PageBanner } from '@/components/pageBanner';
import styles from './styles.module.scss';

const team = [
    {
        id:1,
        img: '/images/generalChef.png',
        name:'Stephan BuckRidger',
        role:'Proprietário'
    },
    {
        id:2,
        img: '/images/manager.png',
        name:'Brandon Schroeder',
        role:'Gerente'
    },
    {
        id:3,
        img: '/images/sushiMan.png',
        name:'Enrico Terry',
        role:'Sushi Man'
    },
    {
        id:4,
        img: '/images/chefAlicia.png',
        name:'Alicia Walker',
        role:'Chef'
    },
    {
        id:5,
        img: '/images/chefRandall.png',
        name:'Randall Rowe',
        role:'Chef'
    },
    {
        id:6,
        img: '/images/chefMeghan.png',
        name:'Meghan Bartoletti',
        role:'Chef'
    },
]

export default function About() {
    return (
        <>
            <PageBanner>Sobre</PageBanner>
            <div className={styles.about}>
                <div className={`row py-5 container m-auto ${styles.aboutBox}`}>
                    <div className={`col-md-6 ${styles.aboutBoxSubtitles}`}>
                        <h2 className='h1 fw-bold'>Quem Somos?</h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen
                            book. It has survived not only five centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged.
                        </p>
                        <p>
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                            Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                            including versions of Lorem Ipsum.
                        </p>
                        <p>
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                            Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                            including versions of Lorem Ipsum.
                        </p>
                    </div>
                    <div className='col-md-6'>
                        <img className='img-fluid' src="/images/AboutImage.png" alt="about image" />
                    </div>
                </div>

                <div className={`container py-5 ${styles.restaurantTeam}`}>
                    <h2 className='fw-bold'>Nossa equipe</h2>
                    <div className='row mt-5'>
                        {team.map(integrant => {
                            return (
                                <div
                                    key={integrant.id} 
                                    className={`col-md-4 d-flex flex-column justify-content-center 
                                    align-items-center mb-5 
                                    ${styles.teamIntegralBox}`}>
                                    <div>
                                        <img className='img-fluid' src={integrant.img} 
                                            alt="General chef" 
                                        />
                                    </div>
                                    <h4>{integrant.name}</h4>
                                    <h6 className='fw-bold'>{integrant.role}</h6>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}