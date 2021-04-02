const fetch = (url: string, method: string, data?: object) => {
  console.log(`makinng ${method} request from ${url} with ${data} data`);
};

class RequestBuilder {
  private url: string | null = null;
  private method: "get" | "post" | null = null;
  private data: object | null = null;

  setURL(url: string): this {
    this.url = url;
    return this;
  }

  setMethod(method: "get" | "post"): this {
    this.method = method;
    return this;
  }

  setData(data: object): this {
    this.data = data;
    return this;
  }

  send() {
    //..
  }
}

// 4. [Hard] As an exercise, think about how you might design a typesafe builder pattern. Extend the Builder pattern Builder Pattern example from earlier in this chapter to:

// 4a. Guarantee at compile time that someone can’t call .send() before setting at least URL and method. Would it be easier to make this guarantee if you also force the user to call methods in a specific order? (Hint: what can you return instead of this?)

class RequestBuilder0 {
  protected data: object | null = null;
  protected method: "get" | "post" | null = null;
  protected url: string | null = null;

  setMethod(method: "post" | "get"): RequestBuilderWithMethod {
    return new RequestBuilderWithMethod().setMethod(method).setData(this.data);
  }

  setData(data: object | null): this {
    this.data = data;
    return this;
  }
}

class RequestBuilderWithMethod extends RequestBuilder0 {
  setMethod(method: "post" | "get" | null): this {
    this.method = method;
    return this;
  }

  setURL(url: string): RequestBuilderWithMethodAndUrl {
    return new RequestBuilderWithMethodAndUrl()
      .setMethod(this.method)
      .setURL(url)
      .setData(this.data);
  }
}

class RequestBuilderWithMethodAndUrl extends RequestBuilderWithMethod {
  setURL(url: string): this {
    this.url = url;
    return this;
  }

  send() {
    //...
  }
}

new RequestBuilder0().setData({}).setMethod("get").setURL("wat.com").send();

// 4b. [Harder] How would you change your design if you wanted to make this guarantee, but still let people call methods in any order?

interface BuilableRequest {
  data?: object;
  method: "get" | "post";
  url: string;
}

class RequestBuilder2 {
  data?: object;
  method?: "get" | "post";
  url?: "string";

  setData(data: object): this & Pick<BuilableRequest, "data"> {
    return Object.assign(this, { data });
  }

  setMethod(method: "get" | "post"): this & Pick<BuilableRequest, "method"> {
    return Object.assign(this, { method });
  }

  setURL(url: string): this & Pick<BuilableRequest, "url"> {
    return Object.assign(this, { url });
  }

  send(this: BuilableRequest) {
    fetch(this.url, this.method, this.data);
  }
}

new RequestBuilder2().setData({}).setMethod("post").setURL("lol").send();
