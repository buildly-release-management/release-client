import {assign, createMachine} from 'xstate';

import {loadProducts} from './actions';

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
export const productMachine = createMachine({
        id: 'product',
        tsTypes: {} as import("./product.typegen").Typegen0,
        context: {
            products: [] as any,
            error: undefined as string | undefined,
            organization_uuid: null as any,
            selectedProduct: null as any

        },
        initial: "Products Loading",
        states: {
            "Products Loading": {
                invoke: {
                    src: loadProducts,
                    onDone: [
                        {
                            target: 'Products Loaded',
                            actions: 'addProductsToCxt'
                        }
                    ],
                    onError: [
                        {
                            target: 'Products Loading Failed',
                            actions: 'addErrorToCxt'
                        }
                    ]
                }
            },

            "Products Loaded": {
                on: {
                    SelectProduct: {
                        actions: "setSelectedProduct"
                    }
                }
            },
            "Products Loading Failed": {}
        }
    },
    {
        actions: {
            addProductsToCxt: assign(
                (cxt, event) => {
                    const data: any = event.data
                    return {products: data, selectedProduct: data[0]}
                }
            ),
            addErrorToCxt: assign((cxt, event) => (
                {error: (event.data as Error).message})
            ),
            // @ts-ignore
            setSelectedProduct: assign((cxt: any, event: any) => {
                const selected = cxt.products.find((item: any) => item.product_uuid === event.product_uuid)
                return {selectedProduct: selected}
            })
        }
    });
