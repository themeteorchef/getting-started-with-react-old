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

#### JSX

To get the job done, we'll be relying on a new syntax (and file format) introduced by React called `JSX`. Using this format, we can embed the HTML in our templates directly in our JavaScript. Wait..why?! This is a convention of React. It sounds scary at first, but the purpose is to keep all of the markup and JavaScript related to our components in one place. If you'd like to learn more about JSX before diving in, it's recommended that you [check out the React vs. Blaze guide here](http://themeteorchef.com/blog/react-vs-blaze/) where we take a closer look at the syntactic differences between the two libraries.

Ready to de-Blaze Base and board Spaceship React? Suit up!

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

First, the easiest thing to point out is that instead of `class`, we're using `className`. Why? This is a React thing. As one of the React core-team members [pointed out here](https://www.quora.com/Why-do-I-have-to-use-className-instead-of-class-in-ReactJs-components-done-in-JSX/answer/Ben-Alpert) it's done as an aid to how they process code behind the scenes as well as padding for the future. The thing to keep in mind is that if we _do not_ change this, React will throw an error in our console and our classes will not be applied correctly. Okay. Not too big a deal.

Next, look at our `<label>` tags and their `for` attribute. This needs to be changed to `htmlFor`. Again, the same logic applies here. While we'll only see a handful during our refactor, you can find [a full list of the attributes that React supports](https://facebook.github.io/react/docs/tags-and-attributes.html) in our JSX code here. Okay we got those in place...anything else?

On our `<input>` tags, notice that we've added the trailing `/`. In our templates this wasn't required (we don't need these in HTML5), but in React _they are_ required. The purpose here is error avoidance. Without these, React still considers the `<input>` tag open and fails to parse our code correctly. [Zuckerberg](https://youtu.be/xtdY6oH4rSU?t=8s)!

Okay okay. Two more things. First, notice that all of our `{{pathFor}}` helpers have been replaced by regular routes. What gives? Well, obviously we don't have access to our template helpers so we need to come up with a solution. Here, we know that the paths we're calling to—`/recover-password` and `/signup`—don't have any dynamic data like paramters, so we can just past the regular path. 

Don't worry, later on, we'll refactor our template helpers used for things like `pathFor` to be React-friendly. For now, though, we can leave these as plain relative URLs and they'll work fine. After we cover the helper refactor, you're welcome to come back and replace them. Whatever floats your boat!

Okay, we've saved the biggest heart attack for last: events. Notice that on our `<form>` element, we've added a new attribute `onSubmit` and have pointed it to `{this.handleSubmit}`. What is that? This is how React handles events. Instead of defining an event handler using `Template.login.events()` like we do with Blaze, here, we specify a function to call when our form's `onSubmit` event happens. Here, we're trying to call to `this.handleSubmit`. Where is that? Let's update our component code quick.

<p class="block-header">/client/components/public/login.jsx</p>

```javascript
Login = React.createClass({
  handleSubmit( event ) {
    event.preventDefault();
  },
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

Up there at the top, notice we've added an additional method before `render()` called `handleSubmit()`. If you're following along, then, you may have guessed that `this` is equal to the entirety of our React component. This means that we can call any method—yep, any—defined on our component using `this.<methodName>`. 

Pretty neat, right? Notice that here, our `handleSubmit` method is taking an `event` argument and we're setting `event.preventDefault()` [just like we did in the JavaScript for our Blaze template](https://github.com/themeteorchef/base/blob/master/client/templates/public/login.js#L6). Easy peasy! Now, when our user submits the form by clicking on the "Login" button, the default form behavior will be disabled. Remember, in our Blaze template, we want to defer the actual submission to our `login` module `Modules.client.login`. How do we do that with React? One more update:

<p class="block-header">/client/components/public/login.js</p>

```javascript
Login = React.createClass({
  componentDidMount() {
    Modules.client.login( { form: "#login" } );
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    return (
      [...]
    );
  }
});
```

Introducing `componentDidMount()`, [one of many oddly named methods]() in React. Notice that inside, we've placed the contents of the JavaScript from [our template's `onRendered` callback](https://github.com/themeteorchef/base/blob/master/client/templates/public/login.js#L1). Neat! As the name implies, this is the method that's called as soon as our React component is "mounted" or rendered on screen.

This is more-or-less identical to how Blaze's `Template.<name>.onRendered()` method works. Easy enough for us, we can just drop our module in and we're done! Well, almost. As we'll see, we'll need to make some microscopic changes to our modules to ensure they work well with our components.

For now, let's continue on to our `signup` template. Heads up, you can delete the existing `login.html` and `login.js` (careful not to delete the `.jsx` file) files in our `/client/components/public` directory.

#### Signup
Here comes the wave of repetition. Are you ready? There's not much different from our `login` template in terms of changes, so let's dump out our refactor and step through it.

<p class="block-header">/client/components/public/signup.jsx</p>

```javascript
Signup = React.createClass({
  componentDidMount() {
    Modules.client.signup({
      form: "#signup"
    });
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <h4 className="page-header">Sign Up</h4>
          <form id="signup" className="signup" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input type="email" name="emailAddress" className="form-control" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-success" value="Sign Up" />
            </div>
          </form>
          <p>Already have an account? <a href="/login">Log In</a>.</p>
        </div>
      </div>
    );
  }
});
```
Underwhelming! Hey, practice makes perfect. Again, we want to watch out for the following items:

1. Attribute names, specifically: `class` to `className` and `for` to `htmlFor`.
2. Closing tags on inputs.
3. Updating our `pathFor` helpers to relative paths.
4. Adding an `onSubmit` event passing a call to `{this.handleSubmit}`.
5. Adding a `handleSubmit` method to our component with an `event` argument and call to `event.preventDefault()` inside.
6. Adding a `componentDidMount()` method, passing a call to our `Modules.client.signup` method.

While these aren't the _only_ considerations you'll have to make with React, these are the basics (our focus for this recipe). In respect to Base, because we're relying on [the module pattern](http://themeteorchef.com/snippets/using-the-module-pattern-with-meteor/) for the bulk of our logic, we don't need to do too much. In your own code, beware that if you store a lot of logic in your templates, there's a good chance you'll have to do a good amount of refactoring. Fair warning!

Okay. Hanging in there? Let's keep chugging on these refactors. Next up is our `recoverPassword` template.

#### Recover password
More of the same stuff. Just a code dump here. We need to update the attributes and other changes to our markup and then add some additional methods for handling interaction.

<p class="block-header">/client/components/public/recover-password.jsx</p>

```javascript
RecoverPassword = React.createClass({
  componentDidMount() {
    Modules.client.recoverPassword({
      form: "#recover-password"
    });
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <h4 className="page-header">Recover Password</h4>
          <form id="recover-password" className="recover-password" onSubmit={this.handleSubmit}>
            <p className="alert alert-info">Enter your email address below to receive a link to reset your password.</p>
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input type="email" name="emailAddress" className="form-control" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-success" value="Recover Password" />
            </div>
          </form>
        </div>
      </div>
    );
  }
});
```

Yawn. Yeah, I know. But again: practice makes perfect with this stuff. The point of this refactor is to start identifying patterns in moving from Blaze to React so that—if we decide to refactor some of our own projects—we have a decent starting point to wrap our heads around. Onward! Now for the `resetPassword` template.

#### Reset password
Same thing. Have at it:

<p class="block-header">/client/components/public/reset-password.jsx</p>

```javascript
ResetPassword = React.createClass({
  componentDidMount() {
    Modules.client.resetPassword( { form: "#reset-password" } );
  },
  handleSubmit( event ) {
    event.submitHandler();
  },
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <h4 className="page-header">Reset Password</h4>
          <form id="reset-password" className="reset-password" onSubmit={this.handleSubmit}>
            <p className="alert alert-info">To reset your password, enter a new one below. You will be logged in with your new password.</p>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" name="newPassword" className="form-control" placeholder="New Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Repeat New Password</label>
              <input type="password" name="repeatNewPassword" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-success" value="Reset Password &amp; Login" />
            </div>
          </form>
        </div>
      </div>
    );
  }
});
```
Still with me? Good. Next, we're going to get into some more interesting stuff. First up is a quick refactor of our `index` template. Let's take a look.

#### Index
This one is pretty easy but includes a little twist...

<p class="block-header">/client/components/authenticated/index.jsx</p>

```javascript
Index = React.createClass({
  render() {
    return (
      <div className="jumbotron text-center" style={{padding: '20px'}}>
        <h2>Base</h2>
        <p>A starting point for Meteor applications.</p>
        <p><a className="btn btn-success" href="http://themeteorchef.com/base" role="button">Read the Documentation</a></p>
        <p style={{fontSize: '16px', color: '#aaa'}}>Currently at v3.1.1</p>
      </div>
    );
  }
});
```

Wait a minute! Spot it? Aside from our usual updates, you'll also notice that we've had to make a little change to our inline styles. Instead of simply passing our styles in `""`, now, we have to pass an object with the names of our styles in `camelCase` and our values in quotes. One thing to point out here is the syntax. Before, you'll notice that we can reference JavaScript inline in our component using `{}` brackets. Here, we have double brackets `{{}}`. Why is that? 

This is because the first set of brackets is meant to identify JavaScript code, while the second is the actual object that we need to return. With this object, React takes to properties and converts them to inline styles accordingly. Make sense?

<div class="note success">
  <h3>This could be a method <i class="fa fa-thumbs-up"></i></h3>
  <p>If our elements had a lot of inline styles for some reason, we could convert this instead to be returned from another method on our component. Both versions work, so pick the one that looks like the right fit for you.</p>
</div>

Okay. We're just getting started with the wild stuff. Next up, we're going to refactor our `header` template. This one will be a little more exciting.

#### Header
In Base, our application header is technically split up into three parts: the actual `header` template along with two sub-templates displayed conditionally: `authenticatedNavigation` and `publicNavigation`. As the names suggest, we show either navigation depending on wheter or not there's a current user logged in. First, let's refactor the `header` and show how we handle the logic.

<p class="block-header">/client/components/globals/header.jsx</p>

```javascript
AppHeader = React.createClass({
  brandLink() {
    if ( !Meteor.loggingIn() && !Meteor.userId() ) {
      return FlowRouter.path( 'login' );
    }

    return FlowRouter.path( 'index' );
  },
  navigationItems() {
    if ( !Meteor.loggingIn() && Meteor.user() ) {
      return <AuthenticatedNavigation />;
    } else {
      return <PublicNavigation />;
    }
  },
  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href={this.brandLink()}>Base in React</a>
          </div>
          {this.navigationItems()}
        </div>
      </nav>
    );
  }
});
```
Told you this was going to get more exciting! A few things going on here. Let's take it one step at a time. 

First, let's look at the first method we've defined on our component `brandLink()`. See what this is doing? The goal here is to give us a link that we can pass to the `href` value of our `.navbar-brand` element (the name of our application). If the user is logged in, we want the link to be `/` for the index route and if the user is logged out, we want the link to be `/login` for the login route. Where we might use a helper in Blaze, here, we're defining this logic directly on our component. 

Notice that inside of our `brandLink()` method, all we're doing is calling on Flow Router's `path` method, passing the name of the path we want returned depending on the login condition. Simple. The big part to pay attention to is where we actually _assign_ this method to the `.navbar-brand` element. On the element, we pass a call to `{this.brandLink()}`. Why the invocation `()`, though? Without this, the function will never return a result. Because we need the return value back, we invoke it inline so the result is assigned to the `href` value of our `.navbar-brand` element.

A little further down in our component, you'll notice another call to `this.navigationItems()` which points to the `navigationItems()` method also defined on our component. The principle here is similar to our `brandLink()` method. Depending on the logged in/logged out state of the user, we want to return one of two components: `<AuthenticatedNavigation />` or `<PublicNavigation />`. Both of these are equivalent to calling `{{> authenticatedNavigation}}` and `{{> publicNavigation}}` in Blaze.

Pay attention, though. Notice that we're _not_ handling our logic inside of our markup like we would with Blaze. Instead, here, we're pulling our logic into a method and simply returning the result of that logic to our `navigationItems()` method. Weird. It is. But, alas, this is the React way. Technically speaking, we _could_ get this to work inline, but the syntax is a bit squirrely.

At this point, we've hit our first usage of nested components. First, let's look at the component we render when our user is logged in `<AuthenticatedNavigation />`.

#### Authenticated navigation
Let's output the code and then step through it like the others.

<p class="block-header">/client/components/globals/authenticated-navigation.jsx</p>

```javascript
AuthenticatedNavigation = React.createClass({
  currentUserEmail() {
    return Meteor.user().emails[0].address;
  },
  render() {
    return (
      <div id="navbar-collapse" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li className={FlowHelpers.currentRoute( 'index' )}><a href="/">Index</a></li>
          <li className={FlowHelpers.currentRoute( 'dashboard' )}><a href="/dashboard">Dashboard</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.currentUserEmail()} <span className="caret"></span></a>
            <ul className="dropdown-menu" role="menu">
              <li onClick={Meteor.logout}><a href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});
```
A little more action! First, notice that the contents of this file are nearly identical to our existing `authenticatedNavigation` template in Blaze. The difference is that instead of just including our two `<ul></ul>` elements, we're wrapping them in the `#navbar-collapse` element. As you'll see next, we'll do the same thing with our `publicNavigation` template's refactor, introducing a bit of repetition. This is a pretty big gotcha with React. 

When we're returning the markup/`JSX` for our component, React will throw a temper tantrum if we include more than one root element. The root element is the top-most level element in our `return()` statement. Without the `#navbar-collapse` wrapper, we'd technically have _two_ elements, sending React into a rendition of [It's My Party and I'll Cry If I Want To](https://www.youtube.com/watch?v=bbOrjHBaDzQ). Alas, this is The React Way™. 

With that out of the way, notice we're starting to mimic our Blaze template helpers a little bit with our call to `this.currentUserEmail()`, a method that return the logged in user's email address. This is equivalent to our call to `{{currentUser.emails.[0].address}}` in our Blaze template. Again, we invoke the method here to get the return value (without this would just be empty).

Lastly, notice that in order to handle the logout option for our users, we've added an `onClick` event to the "Logout" element in our dropdown menu. This simply calls to `Meteor.logout` _without_ the invocation `()`. Wait...how does that work? Well, when our event is called, the function specified here will be invoked for us so we can skip it. 

<div class="note">
  <h3>Why wrap the email part? <i class="fa fa-warning"></i></h3>
  <p>You may be wondering, "couldn't we just pass the result of our <code>currentUserEmail</code> method directly?" Yep! The point here is to showcase two different means for calling and using functions in our JSX. You could just as easily replace <code>{this.currentUserEmail()}</code> with <code>Meteor.user().emails[0].address</code>.</p>
</div>

The difference between this and the email is that we want to call `currentUserEmail()` immediately when the component renders and `Meteor.logout` only when the `onClick` event fires. If you invoked this automatically, as soon as this template renders the user would be logged out! Unless you're a trickster, you probably don't want that.

Okay, that's it! Oh...wait. That `FlowHelpers` part. Ignore that until we get to the section where we refactor our helpers. 

#### Public navigation

#### Gotcha: root elements

#### Dashboard


#### Index

### Updating modules used in our components
This one is pretty quick. We just need to make sure that any references to the template instance in our modules are scrubbed as React cannot make use of them.

- jQuery for selection or native JavaScript. Your choice.

### Updating our routes
#### Our default layout
#### Public routes
#### Authenticated routes
#### Configuration

### Updating our Flow Router helpers
### Resources and going further