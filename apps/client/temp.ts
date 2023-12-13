// client/temp.ts
// @ts-nocheck

async function increaseCartQuantity(product: any | ProductWithAppUser) {
  const { id: productId } = product;

  const originalCartItems = [...cartItems];

  const updateCartItems = (curItems) => {
    if (curItems.find((item) => item.productId === productId) == null) {
      // TODO: FIX CART ID
      return [...curItems, { cartId: 1, productId, quantity: 1, ...product }];
    }

    return curItems.map((item) => {
      if (item.productId === productId) {
        // TODO: handle this error more appropriatly
        if (item.quantity === MAX_PURCHASE_QUANTITY) {
          throw Error('Can only purchase 5 copies of a given item at a time');
        }

        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
  };

  try {
    if (!isAuthenticated) {
      setLocalCartItems((prevItems) => updateCartItems(prevItems));
      return;
    }

    setCartItems((prevItems) => updateCartItems(prevItems));
    addCartItemMutation.mutate(product);

    // const res = await fetch(`/api/app-users/me/cart/items`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ productId }),
    // });

    // if (!res.ok) {
    //   throw new Error('Server update failed');
    //   // setCartItems(originalCartItems);
    //   // console.error('Server update failed: ', res.json());
    //   // throw new Error('Problem adding item to cart');
    // }
  } catch (error) {
    console.error('Server update failed: ', error);
    isAuthenticated
      ? setCartItems(originalCartItems)
      : setLocalCartItems(originalCartItems);
  }
}

async function setCartQuantity(
  product: any | ProductWithAppUser,
  newQuantity: number,
) {
  if (newQuantity > MAX_PURCHASE_QUANTITY) {
    throw Error('Can only purchase 5 copies of a given item at a time');
  }

  const originalCartItems = [...cartItems];

  const { id: productId } = product;

  setCartItems((curItems) => {
    const itemExists = curItems.find((item) => item.productId === productId);

    if (!itemExists) {
      return [...curItems, { ...product, productId, quantity: newQuantity }];
    }

    return curItems.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item,
    );
  });

  if (!isAuthenticated) {
    return;
  }

  try {
    const res = await axios.put(`/api/app-users/me/cart/items`, {
      productId,
      quantity: newQuantity,
    });

    console.log('res: ', res);
    if (res.status !== 200) {
      setCartItems(originalCartItems);
      console.error('Server update failed: ', res.data);
      // throw new Error('Problem adding item to cart');
    }
  } catch (error) {
    setCartItems(originalCartItems);
    console.error('Server update failed: ', error);
  }
}

async function removeFromCart(cartItemId: number) {
  const originalCartItems = [...cartItems];

  setCartItems((curItems) => {
    return curItems.filter((item) => item.id !== cartItemId);
  });

  if (!isAuthenticated) {
    return;
  }

  const res = await fetch(`api/app-users/me/cart/items/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    setCartItems(originalCartItems);
    console.error('Failed to removed item from cart: ', res.json());
    // throw new Error('Failed to removed item from cart');
  }

  // return res.json();
}
