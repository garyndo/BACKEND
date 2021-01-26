import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1>this is home</h1>
                <Button variant="primary" as={Link} to='product'>Go to product page</Button>
            </div>
        )
    }
}

export default Home