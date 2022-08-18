app.component("product", {
    template: /* vue-html */ `
        <section class="product">
        <div class="product__thumbnails">
            <div v-for="(image, index) in product.images"  :key="image.thumbnail " class="thumb" :class="{ active: activeImage === index }" :style="{ backgroundImage: 'url('+ product.images[index].thumbnail + ')'}" @click="activeImage = index"></div>
        </div>
        <div class="product__image">
            <img :src="product.images[activeImage].image" :alt="product.name">
        </div>
        </section> 
        <section class="description">
            <h4>{{ product.name }}</h4>
            <span class="badge new" v-if="product.new">New</span>
            <span class="badge offer" v-if="product.sale">Sale</span>
            <p class="description__status"></p>
            <p class="descirption__price">{{ productPrice }}</p>
            <p class="description__content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus distinctio aliquam architecto quibusdam nesciunt maiores recusandae magni! Non ducimus maxime praesentium officia mollitia minus cupiditate dignissimos doloremque, placeat quas in!</p>
            <div class="discount">
                <span>Discount Code</span>
                <input type="text" placeholder="Your Code Here" @keyup.enter="applyDiscount($event)">
            </div>
            <button :disabled="product.stock === 0" @click="addToCart()">Add To Cart</button>
        </section>
    `,
    data(){
        return {
            product:{
                name: "Camera",
                price: 500_000,
                stock: 3,
                content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus distinctio aliquam architecto quibusdam nesciunt maiores recusandae magni! Non ducimus maxime praesentium officia mollitia minus cupiditate dignissimos doloremque, placeat quas in!`,
                images: [
                    {
                        image: "./images/camara.jpg",
                        thumbnail: "./images/camara-thumb.jpg"
                    },
                    {
                        image: "./images/camara-2.jpg",
                        thumbnail: "./images/camara-2-thumb.jpg"
                    },
                ],
                new:false,
                sale:true,
                quantity: 1,
            },
            activeImage: 0,
            discountCodes: ["FABRICIO20"]
        }
    },
    computed: {
        productPrice(){
            return new Intl.NumberFormat("en-EN").format(this.product.price)
        }
    },
    methods: {
        applyDiscount(event){
            const discountCodeIndex = this.discountCodes.indexOf(event.target.value); 
            if(discountCodeIndex >= 0){
                this.product.price *= 50 / 100;
                this.discountCodes.splice(discountCodeIndex, 1); 
            }
        },
        addToCart(){
            const productIndex = this.cart.findIndex(prod => prod.name === this.product.name)
            if(productIndex >= 0){
                this.cart[productIndex].quantity += 1;
            }else{
                this.cart.push(this.product);
            }
            this.product.stock -= 1;
        }
    }
})