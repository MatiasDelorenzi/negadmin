import React from 'react';


class Sell extends React.Component{

    constructor(){
        super();
        this.state = {
            code: '',
            name: '',
            price: '',
            stock: '',
            products: [],
            _id:'',
            ids : []
        };
        this.addToList = this.addToList.bind(this)
        this.cancelSell = this.cancelSell.bind(this)
        this.endSell = this.endSell.bind(this)
    }

 

    addToList(e){
        const code = document.getElementById("code").value;
        const quantity = document.getElementById("quantity").value;
        fetch(`/api/products/`,{
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
            .then(res => res.json())
            .then(data =>{
                const dblength = data["length"]
                for (let i=0; i<=dblength; i++){
                    const prod = data[i]["code"]
                    if (prod == code){
                        const result = data[i]
                        const id = result["code"]
                        const complexid = result["_id"]
                        const name = result["name"]
                        const price = result["price"]
                        const stock = result["stock"]
                        const prodList = document.getElementById('product-list')
                        const element = document.createElement('div')
                        if (stock >= quantity){
                            element.innerHTML = `
                                <div className="card">
                                    <div className="card-content">
                                        <div className="row">
                                            <strong>Código </strong>: ${id}
                                            <strong>Producto </strong>: ${name}
                                            <strong>Precio Unitario </strong>: ${price}
                                            <strong>Cantidad </strong>: ${quantity}
                                        </div>
                                    </div>
                                </div>
                            `;
                            prodList.appendChild(element);
                            this.state.products.push([complexid, id, name, price, stock, quantity])
                            break;
                        }else{
                            alert(`No hay suficiente stock de ${name}`)
                            break;
                        }
                
                    }
                }
                
            })


        e.preventDefault();
    }

    cancelSell(){
        this.state.products = []
        location.reload()
        console.log('Venta cancelada')
    }

    endSell(e){
        if (confirm('Está seguro que desea finalizar esta venta?')){
            const sell = this.state.products
            for (let k=0; k<=sell["length"]; k++){
                console.log(sell)
                const info = sell[k]
                console.log(info)
                const editedProduct = {
                    _id: info[0],
                    code: info[1],
                    name: info[2],
                    price: info[3],
                    stock: (info[4] - info[5])
                }
                fetch(`/api/products/${info[0]}`,{
                    method: 'PUT',
                    body: JSON.stringify(editedProduct),
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data =>{
                        console.log(data)
                        console.log('llegue a esta linea papaaaaaa puede ser paaaa')
                    })
            }
        }
        e.preventDefault()
    }

    render(){
        return(
            <div>
                {/*NAVIGATION*/}
                <nav className="light-blue darken-4">
                        <div className="container">
                            <a className="brand-logo" href="/">Almacén Cuarenteam</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href='/'>Punto de venta</a></li>
                                <li><a href='/index.html'>Stock</a></li>
                            </ul>
                        </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s3">
                            <div className="card">
                                <div className="card-content">
                                    <form>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="code" name="code" type="number" placeholder="Código de barras"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="quantity" name="quantity" type="number" placeholder="Cantidad" defaultValue="1"/>
                                            </div>
                                        </div>
                                        <button type="push" style={{margin:'4px'}} className="btn light-blue darken-4" onClick={this.addToList}>
                                            AGREGAR PRODUCTO
                                        </button>
                                        <button type="submit"  style={{margin:'4px'}} className="btn light-blue darken-4" onClick={this.endSell}>
                                            FINALIZAR VENTA
                                        </button>
                                        <button type="push" style={{margin:'4px'}} className="btn light-blue darken-4" onClick={this.cancelSell}>
                                            CANCELAR VENTA
                                        </button>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s9">
                            <div id="product-list"></div>
                            {/*Acá va la lista */}
                        </div>
                    </div>
                </div>  
            </div>
        )

    } 
}

export default Sell;