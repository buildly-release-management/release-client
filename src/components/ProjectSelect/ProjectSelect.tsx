import React, { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import { productMachine } from "../../state/product/product";
import { ProductService } from "../../services/product.service";
import Select from "../Select";
import CustomModal from "../Modal/Modal";
import "./ProjectSelect.css";

const productService = new ProductService();

const ProjectSelect = ({ orgUuid }: any) => {
  // Add/Edit release modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // @ts-ignore
  const [productState, send] = useMachine(productMachine, {
    context: {
      products: [],
      error: undefined,
      organization_uuid: "baa50960-1a98-4ced-bb16-b60662ddea55",
      selectedProduct: null,
    },
  });

  // set current product
  const [currentProduct, setCurrentProduct] = useState(null as any);
  useEffect(() => {
    // set current product
    if (productState.context.selectedProduct) {
      setCurrentProduct(productState.context.selectedProduct);
    }
  }, [productState]);

  const setSelectedProduct = (value: any) => {
    send("SelectProduct", { product_uuid: value });
  };

  return (
    <>
      <div className="product-select-container">
        <section className="col-6">
          <Select
            label="Select a product"
            size="large"
            value={currentProduct?.product_uuid}
            info="last updated: 2023-01-13"
            options={
              (productState.context.products.length &&
                productState.context.products.map((product: any) => ({
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
      <CustomModal show={show} />
    </>
  );
};

export default ProjectSelect;
