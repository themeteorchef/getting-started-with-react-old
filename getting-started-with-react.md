### Getting Started
For this recipe, we'll need to install a couple packages to help us out with getting React up and running.

<p class="block-header">Terminal</p>

```bash
meteor add react
```
This is the special sauce. When we install this, we'll get access to React, along with everything we need to make React work with our Meteor application. If you're curious, you can [see what this includes here](http://react-in-meteor.readthedocs.org/en/latest/#whats-in-the-box).

<p class="block-header">Terminal</p>

```bash
meteor add kadira:react-layout
```
We'll use this package to make it easy to render React components in our application. This will be used in conjunction with [Flow Router](https://github.com/kadirahq/flow-router) (the router included with [Base](http://themeteorchef.com/base), the starter kit used for this recipe).

<div class="note">
  <h3>Additional Packages <i class="fa fa-warning"></i></h3>
  <p>This recipe relies on several other packages that come as part of <a href="http://themeteorchef.com/base">Base</a>, the boilerplate kit used here on The Meteor Chef. The packages listed above are merely recipe-specific additions to the packages that are included by default in the kit. Make sure to reference the <a href="http://themeteorchef.com/base/packages-included">Packages Included list</a> for Base to ensure you have fulfilled all of the dependencies.</p>
</div>

### The goal
Our goal with this recipe is to get a basic understanding of React, how it works, and some of the considerations we need to make when moving an application from Blaze (Meteor's default user interface library). To do this, we'll focus on a refactor of [Base](http://themeteorchef.com/base), the starter kit used for recipes here at The Meteor Chef. This will give us a small scope to work within, enough to aid in our comprehension of React but not so much that it's overwhelming. How considerate!

The number one thing to keep in mind about React is that it is _only responsible for the view layer_. This means that anything not related to our templates or template logic does not need to be refactored. Our focus is on taking all of the Blaze-specific code in Base and converting it to React. That's it. Take a deep breath. React has been getting a lot of hype which inevitable leads to fear of being left out. Don't worry, as [it was suggested here](http://themeteorchef.com/blog/react-vs-blaze), React is simply another way to build our interfaces, not law (despite what Mark Zuckerberg and Co. may desire).

Ready to de-Blaze Base and board Spaceship React? Suit up!

<div class="note">
  <h3>Disclaimers <i class="fa fa-warning"></i></h3>
  <p>While it's of interest, this recipe <em>does not</em> suggest an upcoming port of Base to React. If anything, a separate version of Base will be released, however, whether or not this will happen is TBD.</p>
  <p>In addition, I am not a React pro. What you see here is my initial take at refactoring from Blaze to React. The point of this recipe is to see what it takes to get us working with React, not to be the most accurate refactor.</p>
</div>

### Converting existing templates to React components
Our first task is to simply refactor each of the existing Blaze-based templates in Base into React components. We'll go file-by-file, combining the existing HTML and JavaScript for each template into singular components. As we'll see, by the time we finish we'll end up repeating a lot so if you feel confident you understand the higher-level points, don't be afraid to skip ahead. Ready to rock? Let's start with the `login` template.

#### Login
What better place to start than the entry point to our application? To get started, we actually need to start by renaming our `/client/templates` directory to `/client/components`. Why? Well, we want to ensure that we're not confusing ourselves later. When we're working with React, the code we'll write will be referred to as a "component," so it makes sense to rename now. Cool? 

Next, inside of the `/client/components/public` folder, we'll want to create a new file called `login.jsx` and add the skeleton for our new component.

<p class="block-header">/client/components/public/login.jsx</p>

```javascript
Login = React.createClass({
  render() {
    return (
      // Our template markup will be moved here.
    );
  }
});
```
A few things to point out. First, notice that when we create a React component in our application, we want to assign it to a _global_ variable. Why? This is so that we can see the component throughout our application. Because we're working with a limited number of components in this app, using a global isn't the _worst_ thing we can do. If you're working on a bigger app, though, it may be worth namespacing your components (e.g. `Components.Login`). Up to you.

Next, notice that all component definitions start with a call to `React.createClass()` accepting an object with methods defined on it. By default, the `render()` method we've defined here is the only method that our component _must_ have. Everything else is optional depending on the functionality of our component.

Once we have this in place, we can open up `/client/components/index.html` (remember, we renamed this directory from `/templates` so try not to get confused) and copy the contents—excluding the `<template>` tags and paste them _within_ the `return()` statement of our component's `render()` method. Once we've pasted, we'll need to make a few changes to the markup to make sure it's React-friendly. We're going to output the refactored version of this below and step through it. If you get stuck, make sure to [reference the source for the template](https://github.com/themeteorchef/base/blob/master/client/templates/public/login.html).

<p class="block-header">/client/components/public/login.jsx</p>

```javascript
Login = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <h4 className="page-header">Login</h4>
          <form id="login" className="login" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input type="email" name="emailAddress" className="form-control" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <label htmlFor="password"><span className="pull-left">Password</span> <a className="pull-right" href="/recover-password">Forgot Password?</a></label>
              <input type="password" name="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-success" value="Login" />
            </div>
          </form>
          <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
        </div>
      </div>
    );
  }
});
```
Okay? It looks the same? Almost! This is one of the first "gotchas" of React. Notice that some of our element's attributes have funky names and that some of our tags are ending with a `/` that we didn't need before. What?! Let's step through it.

First, the easiest thing to point out is that instead of `class`, we're using `className`. 

#### Signup
#### Recover password
#### Reset password
#### Index
#### Dashboard

### Updating modules used in our components
This one is pretty quick. We just need to make sure that any references to the template instance in our modules are scrubbed as React cannot make use of them.

- jQuery for selection or native JavaScript. Your choice.

### Updating our routes
#### Public routes
#### Authenticated routes
#### Configuration

### Updating our Flow Router helpers
### Resources and going further