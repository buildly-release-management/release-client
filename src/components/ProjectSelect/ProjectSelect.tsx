import React from "react";
import Select from "../Select";
import { useMachine } from "@xstate/react";
import { productMachine } from "../../state/product/product";
import { ProductService } from "../../services/product.service";

const productService = new ProductService();

const ProjectSelect = ({ orgUuid }: any) => {
  const [productState] = useMachine(productMachine, {
    services: {
      loadProducts: async (): Promise<any> =>
        productService.getProducts(orgUuid).then((products) => {
          if (products?.length) {
            return products.map((product: any) => {
              return {
                label: product.name,
                value: product.product_uuid,
              };

              // return selectOptions.sort((a: any, b: any) =>
              //   a.label > b.label ? 1 : -1
              // );
            });
          }
          return [];
        }),
    },
  });

  return (
    <>
      <div className="flex-container d-flex flex-row justify-content-between align-items-center">
        <section className="col-6">
          <Select
            label="Select a product"
            size="large"
            info="last updated"
            options={productState.context.products}
          />
        </section>

        {/*<Button variant="outline-secondary" onClick={handleShow}>*/}
        {/*  New release*/}
        {/*</Button>*/}
      </div>
    </>
  );
};

export default ProjectSelect;
