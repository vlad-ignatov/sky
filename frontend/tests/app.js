/* global describe, it */
import $            from "jquery"
import React        from "react"
import chai         from "chai"
import * as actions from "../src/actions"
import TestUtils    from "react-addons-test-utils"
import Footer       from "../src/components/Footer"
import Header       from "../src/components/Header"
import Basket       from "../src/components/Basket"
import Panel        from "../src/components/Panel"
import ProductList  from "../src/components/ProductList"

const expect = chai.expect



describe("Footer", () => {
    it ("renders the Footer with the given props", () => {
        let props = { email: "a", name: "b" }
        let component = TestUtils.renderIntoDocument(<Footer { ...props } />);
        let a = TestUtils.scryRenderedDOMComponentsWithTag(component, "a")
        expect(a[0].innerText).to.equal(props.name);
        expect(a[0].href).to.equal("mailto:" + props.email);
    })
})

describe("Header", () => {
    it ("renders the Header with the provided customerID", () => {
        ["london_user", "liverpool_user"].forEach(customerID => {
            let component = TestUtils.renderIntoDocument(
                <Header customerID={ customerID } setCustomerId={actions.setCustomerId}/>
            )
            let select = TestUtils.scryRenderedDOMComponentsWithTag(component, "select")[0]
            expect(select.options[select.selectedIndex].value).to.equal(customerID);
        })
    })
})

describe("Basket", () => {
    it ("renders with empty message", () => {
        let component = TestUtils.renderIntoDocument(<Basket label="whatever"/>)
        let panel = TestUtils.scryRenderedDOMComponentsWithClass(component, "panel")[0]
        expect($(".panel-body", panel).text()).to.equal("Your basket is empty");
        expect($("button", panel).prop("disabled")).to.equal(true);
    })

    it ("renders with single product", () => {
        let component = TestUtils.renderIntoDocument(<Basket label="whatever" products={[
            { product: "Product 1" }
        ]}/>)
        let panel = TestUtils.scryRenderedDOMComponentsWithClass(component, "panel")[0]
        expect($(".panel-body", panel).text()).to.equal("Product 1");
        expect($("button", panel).prop("disabled")).to.equal(false);
    })

    it ("renders with multiple products", () => {
        let component = TestUtils.renderIntoDocument(<Basket label="whatever" products={[
            { product: "Product 1" },
            { product: "Product 2" }
        ]}/>)
        let panel = TestUtils.scryRenderedDOMComponentsWithClass(component, "panel")[0]
        expect($(".panel-body li", panel).length).to.equal(2);
        expect($(".panel-body li:first", panel).text()).to.equal("Product 1");
        expect($(".panel-body li:last", panel).text()).to.equal("Product 2");
        expect($("button", panel).prop("disabled")).to.equal(false);
    })
})

describe("Panel", () => {
    it ("renders the Panel with the given label", () => {
        let component = TestUtils.renderIntoDocument(<Panel label="whatever"/>)
        let panel = TestUtils.scryRenderedDOMComponentsWithClass(component, "panel")[0]
        expect($(".panel-heading", panel).text()).to.equal("whatever")
    })

    it ("renders the Panel with the given children", () => {
        let component = TestUtils.renderIntoDocument(<Panel label="whatever"><i>x</i></Panel>)
        let i = TestUtils.scryRenderedDOMComponentsWithTag(component, "i")
        expect(i.length).to.equal(1)
    })

    it ("renders the Panel with the given className", () => {
        let component = TestUtils.renderIntoDocument(<Panel label="whatever" className="test-class"/>)
        let panel = TestUtils.scryRenderedDOMComponentsWithClass(component, "panel")[0]
        expect($(panel).is(".test-class")).to.equal(true)
    })

    it ("renders the Panel with the given label className", () => {
        let component = TestUtils.renderIntoDocument(<Panel label="whatever" labelClassName="test-class"/>)
        let panel = TestUtils.scryRenderedDOMComponentsWithClass(component, "panel-heading")[0]
        expect($("> b", panel).is(".test-class")).to.equal(true)
    })
})

describe("ProductList", () => {
    it ("renders the ProductList with the given props", () => {
        let products = [
            { product: "Product 1" },
            { product: "Product 2", selected: true },
            { product: "Product 3" },
            { product: "Product 4" }
        ];
        let component = TestUtils.renderIntoDocument(
            <ProductList toggleProduct={ actions.toggleProduct } products={products} />
        )
        let panel = TestUtils.scryRenderedDOMComponentsWithClass(component, ".list-group")[0]
        $("input", panel).each((o, i) => {
            expect(o.checked).to.equal(products[i].selected)
            expect(o.parentNode.innerText).to.equal(" " + products[i].product)
        })
    })
})
