import React from 'react';

class App extends React.Component{

    constructor(){
        super();
        this.state = {
            code: '',
            name: '',
            price: '',
            stock: '',
            products: [],
            _id: ''
        };
        this.addProduct = this.addProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addProduct(e){
        if (this.state._id){
            fetch(`/api/products/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Producto Actualizado'})
                this.setState({code:'', name:'', price:'', stock:'', _id:''})
                this.fetchProducts()
            })
        } else {
            fetch('/api/products', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
    
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Producto Guardado'})
                    this.setState({code:'', name:'', price:'', stock:''});
                    this.fetchProducts();
                })
                .catch(err => console.log(err));
        }

            e.preventDefault();
    }

    componentDidMount(){
        this.fetchProducts();
    }

    fetchProducts() {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({products: data})
            });
    }

    deleteProduct(id){
        if (confirm('¿Está seguro que quiere eliminar este producto?')){
            fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
    
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Producto Eliminado'})
                this.fetchProducts()
            })
        }
    }

    editProduct(id){
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    code: data.code,
                    name: data.name,
                    price: data.price,
                    stock: data.stock,
                    _id: data._id
                })
            })
        
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

   
    render() {
        return(
            <div>
                {/*NAVIGATION*/}
                <nav className="light-blue darken-4">
                        <div className="container">
                            <a className="brand-logo" href="/">Almacén Cuarenteam</a>
                            <ul id="nav-mobile" class="right hide-on-med-and-down">
                                <li><a href='./sell.html'>Punto de venta</a></li>
                                <li><a href='/'>Stock</a></li>
                            </ul>
                        </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s3">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addProduct}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="code" onChange={this.handleChange} type="number" placeholder="Código" value={this.state.code}/>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="name" onChange={this.handleChange} type="text" placeholder="Nombre del producto" value={this.state.name}/>

                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="price" onChange={this.handleChange} type="number" placeholder="Precio" value={this.state.price}/>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="stock" onChange={this.handleChange} type="number" placeholder="Stock" value={this.state.stock}/>

                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            GUARDAR
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s9">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Stock</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.products.map(product => {
                                            return(
                                                <tr key={product._id}>
                                                    <td>{product.code}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.stock}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.editProduct(product._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" style={{margin:'4px'}} onClick={() => this.deleteProduct(product._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;