import { Category } from '#models/category/categoryModel.js';
import { Customer } from '#models/customer/customerModel.js';
import { Order } from '#models/order/orderModel.js';
import { OrderItem } from '#models/orderItem/orderItemModel.js';
import { Product } from '#models/product/productModel.js';
import Store from '#models/store/storeModel.js';
import { faker } from '@faker-js/faker';


// List of image URLs for products and categories
const imageUrls = [
    'https://i.ibb.co/20h7pfym/watch.jpg',   // Image 1
    'https://i.ibb.co/9kXXpv5V/laptop.jpg', // Image 2
    'https://i.ibb.co/gLn64XLv/shirt.png'   // Image 3
];

// Function to randomly select an image from the imageUrls array
const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length); // Generate a random index (0, 1, or 2)
    return imageUrls[randomIndex]; // Return the image URL based on the random index
};

// Function to generate the slug from the product name
const generateSlug = (productName) => {
    return productName.toLowerCase().replace(/\s+/g, '-'); // Convert to lowercase and replace spaces with dashes
};



const createCategoriesWithStores = async () => {
    for (let i = 0; i < 30; i++) {
        const category = new Category({
            name: faker.commerce.department(),
            image: getRandomImage(), // Randomly assign an image URL from the imageUrls array
            isActive: true
        });
        await category.save();

        const store = new Store({
            name: faker.company.name(),
            address: `${faker.location.city(), faker.location.country()}`,
            location: {
                coordinates: [faker.location.longitude(), faker.location.latitude()]  // Random coordinates
            },
            storeType: faker.commerce.department(),
            contactDetails: {
                phone: faker.phone.number(),
                email: faker.internet.email()
            },
            isActive: true,
            logo: getRandomImage()
        });

        await store.save();
        createProducts(category._id, store._id); // Pass categoryId when creating products
    }
}



// Function to create products under each category
const createProducts = async (categoryId, storeId) => {
    for (let i = 0; i < 10; i++) {
        const productName = faker.commerce.productName(); // Generate product name
        const slug = generateSlug(productName); // Generate slug based on product name

        const product = new Product({
            categoryId: categoryId,
            storeId: storeId,
            name: productName,
            slug: slug, // Set slug to be the same as the product name (transformed)
            costPrice: faker.commerce.price(),
            salePrice: faker.commerce.price(),
            image: getRandomImage(), // Randomly assign an image URL from the imageUrls array
            description: faker.lorem.sentence(),
            isActive: true,
            createdAt: new Date()
        });

        await product.save();
    }
};

// Function to generate and insert customers and orders
const generateData = async () => {
    // Create 100 customers, each with data spread over 6 months
    for (let i = 0; i < 100; i++) {
        const createdAt = faker.date.past(6);
        const customer = new Customer({
            name: faker.person.fullName(), // Correct method for full name
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.city(),
            image: faker.image.avatar(),
            createdAt: createdAt,
            updatedAt: createdAt
        });

        await customer.save();

        // Generate orders for each customer
        await createOrders(customer._id, createdAt);
    }
};

// Function to create orders for each customer
const createOrders = async (customerId, customerCreatedAt) => {
    // Generate random number of orders (around 2 orders per month for simplicity)
    for (let i = 0; i < 10; i++) {
        // Generate a random order date between customerCreatedAt and the current date
        const randomDate = new Date(customerCreatedAt.getTime() + Math.random() * (new Date() - customerCreatedAt.getTime()));

        // Create an order
        const order = new Order({
            customerId: customerId,
            totalAmount: 0, // To be updated after adding order items
            deliveryAddress: faker.location.city(),
            totalQuantity: 0, // To be updated after adding order items
            status: faker.helpers.arrayElement(['Pending', 'Delivered', 'Completed', 'Refunded']),
            createdAt: randomDate,
            updatedAt: randomDate
        });

        await order.save();

        // Generate order items for each order
        await createOrderItems(order._id);
    }
};

// Function to create order items for each order
const createOrderItems = async (orderId) => {
    const orderItemsCount = Math.floor(Math.random() * 5) + 1; // Random number of order items (1 to 5)

    let totalAmount = 0;
    let totalQuantity = 0;

    for (let i = 0; i < orderItemsCount; i++) {
        const product = await Product.aggregate([{ $sample: { size: 1 } }]); // Get a random product from the database
        const unitPrice = parseFloat(product[0].salePrice); // Get the sale price of the product
        const quantity = Math.floor(Math.random() * 5) + 1; // Random quantity (1 to 5)
        const total = unitPrice * quantity; // Calculate the total for this order item

        // Create the order item
        const orderItem = new OrderItem({
            orderId: orderId,
            productId: product[0]._id,
            unitPrice: unitPrice,
            quantity: quantity,
            total: total
        });

        await orderItem.save();

        // Update totalAmount and totalQuantity for the order
        totalAmount += total;
        totalQuantity += quantity;
    }

    // Update the order with the total amount and quantity
    await Order.findByIdAndUpdate(orderId, {
        totalAmount: totalAmount,
        totalQuantity: totalQuantity
    });
};

// Run the data insertion
const insertData = async (req, res) => {
    await createCategoriesWithStores();
    await generateData();
    console.log('Data generation completed');

    res.status(200).json({ message: 'Data generation completed' });
    // mongoose.disconnect(); // Optionally disconnect from MongoDB
};

export { insertData };
