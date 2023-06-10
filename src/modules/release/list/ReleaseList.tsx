import { useMachine } from "@xstate/react";
import { releaseMachine } from "../../../state/release/release";
import { ReleaseService } from "../../../services/release.service";
import Table from "react-bootstrap/Table";
import { Release } from "../../../interfaces/release";
import React from "react";
import Select from "../../../components/Select";
import Button from "react-bootstrap/Button";
import "./../../../assets/css/button.css";
import { ProductService } from "../../../services/product.service";
import { productMachine } from "../../../state/product/product";

const orgUuid = "baa50960-1a98-4ced-bb16-b60662ddea55";
const releaseService = new ReleaseService();
const productService = new ProductService();

function ReleaseList() {
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
  const [state, send] = useMachine(releaseMachine, {
    services: {
      loadReleases: async (): Promise<any> => {
        return releaseService.loadReleases("");
      },
    },
  });

  return (
    <>
      <div className="container">
        <div className="flex-container d-flex flex-row justify-content-between align-items-center">
          <section className="col-6">
            <Select
              label="Select a product"
              size="large"
              info="last updated"
              options={productState.context.products}
            />
          </section>

          <Button variant="outline-secondary">New release</Button>
        </div>
        <div className="row">
          <h2>Releases</h2>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Release date</th>
              <th>Features</th>
            </tr>
          </thead>
          <tbody>
            {state.matches("Releases Loaded") &&
              state.context.releases.map((release: Release) => (
                <tr key={release.release_uuid}>
                  <td>{release.name}</td>
                  <td>{release.release_date}</td>
                  <td>{release.features_count}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ReleaseList;
