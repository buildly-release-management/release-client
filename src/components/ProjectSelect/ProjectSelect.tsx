import React, {useEffect, useState, useContext} from "react";

import {useActor, useSelector} from '@xstate/react';
import {useMachine} from "@xstate/react";

import {productMachine} from "../../state/product/product";
import {ProductService} from "../../services/product.service";
import Select from "../Select";
import CustomModal from "../Modal/Modal";
import "./ProjectSelect.css";
import { GlobalStateContext } from '../../contexts/globalState';
const productService = new ProductService();

const ProjectSelect = ({orgUuid}: any) => {
    // Add/Edit release modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const globalContext = useContext(GlobalStateContext);
    const [productState, send] = useActor(globalContext.productMachineService);
    const selectCurrentProduct = (state: any) => state.context.selectedProduct;

    // @ts-ignore
    // const [productState, send] = useMachine(productMachine, {
    //     context: {
    //         products: [],
    //         error: undefined,
    //         selectedProduct: null,
    //     },
    // });

    // set current product
    const currentProduct = useSelector(globalContext.productMachineService, selectCurrentProduct)
    // const [currentProduct, setCurrentProduct] = useState(null as any);
    // useEffect(() => {
    //     // set current product
    //     if (productState?.context.selectedProduct) {
    //         setCurrentProduct(productState?.context.selectedProduct);
    //     }
    // }, [productState]);

    const setSelectedProduct = (value: any) => {
        send({type: 'SelectProduct', product_uuid: value});
    };

    return (
        <>
            <div className="product-select-container">
                <section className="col-6">
                    <Select
                        label="Select a product"
                        size="large"
                        value={currentProduct?.product_uuid}
                        info="last updated: 2023 -01-13"
                        options={
                            (productState?.context?.products?.length &&
                                productState?.context?.products.map((product: any) => ({
                                    label: product.name,
                                    value: product.product_uuid,
                                }))) ||
                            []
                        }
                        onChange={(event) => setSelectedProduct(event.target.value)}
                    />
                </section>

                {/*<Button variant="outline-secondary" size="sm" onClick={handleShow}>*/}
                {/*  New release*/}
                {/*</Button>*/}
            </div>

            {/*Add/Edit release modal*/}
            <CustomModal show={show}/>
        </>
    );
};

export default ProjectSelect;
