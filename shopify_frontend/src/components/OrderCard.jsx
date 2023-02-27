import React from 'react'
import { LegacyCard, Page, AlphaCard, Badge, Stack, Card, IndexTable, Text } from "@shopify/polaris"
const OrderCard = ({
    order_id,
    order_name,
    order_date,
    order_items,
    Total }) => {





    const rowMarkup = order_items.map(
        ({ p_id, p_name, p_quantity, p_price }, index) => (
            <IndexTable.Row id={p_id} key={p_id} position={index}>
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {p_name}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{p_quantity}</IndexTable.Cell>
                <IndexTable.Cell>{p_price} INR</IndexTable.Cell>
                <IndexTable.Cell>{p_quantity * p_price} INR</IndexTable.Cell>
            </IndexTable.Row>
        ),
    );


    const resourceName = {
        singular: 'order_item',
        plural: 'order_items',
    };

    return (
        <div>

            <AlphaCard>
                <Stack distribution="equalSpacing">
                    <Badge status='info'>Order: {order_name}</Badge>
                    <Badge status="info">Order Date: {order_date}</Badge>
                </Stack>
            <br />
                <LegacyCard>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={order_items.length}
                        headings={[
                            { title: 'Product Name' },
                            { title: 'Quantity' },
                            { title: 'Price' },
                            { title: 'total Ammount'},
                        ]}
                        selectable={false}
                    >
                        {rowMarkup}
                    </IndexTable>
                </LegacyCard>
                <br />
                
                <Badge  size="small"> After including all discount and extra charges the </Badge>
                <br />
                <Text variant="bodyMd" fontWeight="bold" as="span">
                        <Badge status="warning"> Grand Total: </Badge>{Total} INR
                    </Text>
            </AlphaCard >
            <br />
        </div>
    )
}

export default OrderCard