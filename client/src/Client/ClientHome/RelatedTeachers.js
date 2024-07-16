import React, { useEffect, useState } from 'react'
import { Button, Alert, Breadcrumb, Card, Form, Container, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Buffer } from 'buffer'

function RelatedTeachers() {
    const [relatedProviders, setRelatedProviders] = useState([])
    useEffect(() => {
        const fetchRelatedProviders = async () => {
            const fetchRelatedProvidersResponse = await axios.get('https://sell-skill-d7865032728d.herokuapp.com/api/endPoints/getRelatedProviders')
            console.log('related providers ===> ', fetchRelatedProvidersResponse.data)
            setRelatedProviders(fetchRelatedProvidersResponse.data)
        }
        fetchRelatedProviders();
    }, [])

    return (
        <div style={{ backgroundColor: 'blue' }}>
            <div><b>Related providers in your field</b></div>
            {
                relatedProviders.length > 0 ? relatedProviders.map((relatedProvider, index) => (
                    <Container key={index}>
                        <Card style={{ position: 'relative', top: '200px', marginBottom: '40px', backgroundColor: 'black' }}>
                            <Card.Title style={{ position: 'relative', left: '200px', top: '50px', color: 'white' }}>
                                {relatedProvider.name}
                            </Card.Title>
                            <Card.Title style={{ position: 'relative', left: '200px', top: '50px', color: 'white' }}>
                                {relatedProvider.email}
                            </Card.Title>
                            <Card.Title style={{ position: 'relative', left: '200px', top: '50px', color: 'white' }}>
                                 {relatedProvider.ratePerHour}
                            </Card.Title>
                            <Card.Title>
                                {
                                    relatedProvider.categories.map((relatedProviderCategory, index) => (
                                        <div key={index} style={{'position':'relative','left':'140px'}}>{relatedProviderCategory}</div>
                                    ))
                                }
                            </Card.Title>
                            {relatedProvider.picture && relatedProvider.picture.picture && relatedProvider.picture.picture.data  ? (
    <img 
        src={'data:image/jpg;base64,' + Buffer.from(relatedProvider.picture.picture.data, 'binary').toString('base64')} 
        style={{ position: 'relative', top: '-60px', height: '120px', width: '120px', borderRadius: '90px' }} 
     
    />
): (<img src="/images/NormalProfile.jpg" style={{'width':'30px', 'height':'20px'}}/>)}

                            <a style={{ cursor: 'pointer' }}>
                                <div style={{ position: 'relative', left: '950px', top: '-120px', backgroundColor: 'green', height: '40px', width: '120px', borderRadius: '10px' }}>
                                    <b style={{ position: 'relative', left: '35px', top: '8px' }}>invite</b>
                                </div>
                            </a>
                        </Card>
                    </Container>
                ))
                    : (<div>loading...</div>)
            }
        </div>
    )
}

export default RelatedTeachers
