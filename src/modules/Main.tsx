import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './Main.css';
import ReleaseList from './release/list/ReleaseList';
import {useMachine} from '@xstate/react';
import {productMachine} from '../state/product/product';
import {ProductService} from '../services/product.service';
import SampleNavbar from '../components/Navbar/Navbar';


const productService = new ProductService();
const orgUuid = 'baa50960-1a98-4ced-bb16-b60662ddea55';

const Main = () => {
    const [productState, productSend] = useMachine(productMachine, {
        services: {
            loadProducts: async (): Promise<any> => productService.getProducts(orgUuid),
        }
    });
    return (
        <>
            <SampleNavbar products={productState.context.products}/>
            <Routes>
                <Route path="/" element={<ReleaseList/>}/>
                <Route path="releases" element={<ReleaseList/>}/>
            </Routes>
        </>
    )
}

export default Main;
