import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        
        setCryptos(filteredData);
    }, [cryptoList, searchTerm])

    if(isFetching) return <Loader />
    return (
        <>
        {!simplified && (
            <div className="search-cypto">
                <Input placeholder='Search Cryptocurrency' onChange={e => setSearchTerm(e.target.value)}/>
            </div>
        )}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map(currencies => (
                    <Col xs={24} sm={12} lg={5} className='crypto-card' key={currencies.id}>
                        <Link to={`/crypto/${currencies.id}`}>
                            <Card 
                                title={`${currencies.rank}. ${currencies.name}`}
                                extra={<img className='crypto-image' src={currencies.iconUrl} alt=""/>}
                                hoverable
                                >
                                    <p>Price:{millify(currencies.price)}</p>
                                    <p>Market Cap:{millify(currencies.marketCap)}</p>
                                    <p>Daily Change:{millify(currencies.change)}%</p>
                            </Card>
                        </Link>

                    </Col>
                ))}
            </Row>

        </>
    )
}

export default Cryptocurrencies
