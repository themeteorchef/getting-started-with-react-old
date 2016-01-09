### Getting Started
For this recipe, we'll need to install a couple packages to help us out with getting React up and running.

<p class="block-header">Terminal</p>

```bash
meteor add react
```
This is the special sauce. When we install this, we'll get access to React, along with everything we need to make React work with our Meteor application. If you're curious, you can [see what this includes here](https://react-in-meteor.readthedocs.org/en/latest/#whats-in-the-box).

<p class="block-header">Terminal</p>

```bash
meteor add kadira:react-layout
```
We'll use this package to make it easy to render React components in our application. This will be used in conjunction with [Flow Router](https://github.com/kadirahq/flow-router) (the router included with [Base](https://themeteorchef.com/base), the starter kit used for this recipe).

<div class="note">
  <h3>Additional Packages <i class="fa fa-warning"></i></h3>
  <p>This recipe relies on several other packages that come as part of <a href="https://themeteorchef.com/base">Base</a>, the boilerplate kit used here on The Meteor Chef. The packages listed above are merely recipe-specific additions to the packages that are included by default in the kit. Make sure to reference the <a href="https://themeteorchef.com/base/packages-included">Packages Included list</a> for Base to ensure you have fulfilled all of the dependencies.</p>
</div>

### The goal
Our goal with this recipe is to get a basic understanding of React, how it works, and some of the considerations we need to make when moving an application from Blaze (Meteor's default user interface library). To do this, we'll focus on a refactor of [Base](https://themeteorchef.com/base), the starter kit used for recipes here at The Meteor Chef. This will give us a small scope to work within, enough to aid in our comprehension of React but not so much that it's overwhelming. How considerate!

The number one thing to keep in mind about React is that it is _only responsible for the view layer_. This means that anything not related to our templates or template logic does not need to be refactored. Our focus is on taking all of the Blaze-specific code in Base and converting it to React. That's it. Take a deep breath. React has been getting a lot of hype which inevitably leads to fear of being left out. Don't worry, as [it was suggested here](https://themeteorchef.com/blog/react-vs-blaze), React is simply another way to build our interfaces, not law (despite what Mark Zuckerberg and Co. may desire).

#### JSX

To get the job done, we'll be relying on a new syntax (and file format) introduced by React called `JSX`. Using this format, we can embed the HTML in our templates directly in our JavaScript. Wait..why?! This is a convention of React. It sounds scary at first, but the purpose is to keep all of the markup and JavaScript related to our components in one place. If you'd like to learn more about JSX before diving in, it's recommended that you [check out the React vs. Blaze guide here](https://themeteorchef.com/blog/react-vs-blaze/) where we take a closer look at the syntactic differences between the two libraries.

Ready to de-Blaze Base and board Spaceship React? Suit up!

### Converting existing templates to React components
Our first task is to simply refactor each of the major (we're going to leave out the `notFound` template in the article) Blaze-based templates in Base into React components. We'll go file-by-file, combining the existing HTML and JavaScript for each template into singular components. As we'll see, by the time we finish we'll end up repeating a lot so if you feel confident you understand the higher-level points, don't be afraid to skip ahead. Ready to rock? Let's start with the `login` template.

#### Login
What better place to start than the entry point to our application? To get started, we actually need to start by renaming our `/client/templates` directory to `/client/components`. Why? Well, we want to ensure that we're not confusing ourselves later. When we're working with React, the code we'll write will be referred to as a "component," so it makes sense to rename now.

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

Next, notice that all component definitions start with a call to `React.createClass()` accepting an object with methods (and properties) defined on it. By default, the `render()` method we've defined here is the only method that our component _must_ have. Everything else is optional depending on the functionality of our component.

Once we have this in place, we can open up `/client/components/login.html` (remember, we renamed this directory from `/templates` so try not to get confused) and copy the contents—excluding the `<template>` tags and paste them _within_ the `return()` statement of our component's `render()` method. Once we've pasted, we'll need to make a few changes to the markup to make sure it's React-friendly. We're going to output the refactored version of this below and step through it. If you get stuck, make sure to [reference the source for the template](https://github.com/themeteorchef/base/blob/master/client/templates/public/login.html).

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

Next, look at our `<label>` tags and their `for` attribute. This needs to be changed to `htmlFor`. Again, the same logic applies here. While we'll only see a few during our refactor, you can find [a full list of the attributes that React supports here](https://facebook.github.io/react/docs/tags-and-attributes.html). Okay we have those in place...anything else?

On our `<input>` tags, notice that we've added the trailing `/`. In our templates this wasn't required (we don't need these in HTML5), but in React _they are_ required. The purpose here is error avoidance. Without these, React still considers the `<input>` tag open and fails to parse our code correctly. [Zuckerberg](https://youtu.be/xtdY6oH4rSU?t=8s)!

Okay okay. Two more things. First, notice that all of our `{{pathFor}}` helpers have been replaced by regular routes. What gives? Well, obviously we don't have access to our template helpers so we need to come up with a solution. Here, we know that the paths we're calling to—`/recover-password` and `/signup`—don't have any dynamic data like parameters, so we can just past the regular path. 

Don't worry, later on we'll refactor our template helpers used for things like `pathFor` to be React-friendly. For now, though, we can leave these as plain relative URLs and they'll work fine. After we cover the helper refactor, you're welcome to come back and replace them. Whatever floats your boat!

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

Introducing `componentDidMount()`, [one of many oddly named methods](https://themeteorchef.com/blog/react-vs-blaze/#tmc-react-methods-vs-blaze-methods) in React. Notice that inside, we've placed the contents of the JavaScript from [our template's `onRendered` callback](https://github.com/themeteorchef/base/blob/master/client/templates/public/login.js#L1). Neat! As the name implies, this is the method that's called as soon as our React component is "mounted" or rendered on screen.

This is more-or-less identical to how Blaze's `Template.<name>.onRendered()` method works. Easy enough for us, we can just drop our module in and we're done! Well, almost. As we'll see, we'll need to make some microscopic changes to our modules to ensure they work well with our components.

For now, let's continue on to our `signup` template. Heads up, you can delete the existing `login.html` and `login.js` (careful not to delete the `.jsx` file) files in our `/client/components/public` directory. You will want to do this after each of the following refactors (unless you want to keep them around for reference).

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

While these aren't the _only_ considerations you'll have to make with React, these are the basics (our focus for this recipe). In respect to Base, because we're relying on [the module pattern](https://themeteorchef.com/snippets/using-the-module-pattern-with-meteor/) for the bulk of our logic, we don't need to do too much. In your own code, beware that if you store a lot of logic in your templates, there's a good chance you'll have to do a good amount of refactoring. Fair warning!

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

This is because the first set of brackets is meant to identify JavaScript code, while the second is the actual object that we need to return. With this object, React takes the properties and converts them to inline styles accordingly. Make sense?

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

When we're returning the markup/`JSX` for our component, React will throw a temper tantrum if we include more than one root element. The root element is the top-most level element in our `return()` statement. Without the `#navbar-collapse` wrapper, we'd technically have _two_ elements, sending React into a rendition of [It's My Party and I'll Cry If I Want To](https://youtu.be/KhAg5po8InY?t=6s). Alas, this is The React Way™. 

With that out of the way, notice we're starting to mimic our Blaze template helpers a little bit with our call to `this.currentUserEmail()`, a method that returns the logged in user's email address. This is equivalent to our call to `{{currentUser.emails.[0].address}}` in our Blaze template. Again, we invoke the method here to get the return value (without this, it would just be empty).

Lastly, notice that in order to handle the logout option for our users, we've added an `onClick` event to the "Logout" element in our dropdown menu. This simply calls to `Meteor.logout` _without_ the invocation `()`. Wait...how does that work? Well, when our event is called, the function specified here will be invoked for us so we can skip it. 

<div class="note">
  <h3>Why wrap the email part? <i class="fa fa-warning"></i></h3>
  <p>You may be wondering, "couldn't we just pass the result of our <code>currentUserEmail</code> method directly?" Yep! The point here is to showcase two different means for calling and using functions in our JSX. You could just as easily replace <code>{this.currentUserEmail()}</code> with <code>{Meteor.user().emails[0].address}</code>.</p>
</div>

The difference between this and the email is that we want to call `currentUserEmail()` immediately when the component renders and `Meteor.logout` only when the `onClick` event fires. If you invoked this automatically, as soon as this component renders the user would be logged out! Unless you're a trickster, you probably don't want that.

Okay, that's it! Oh...wait. That `FlowHelpers` part. Ignore that until we get to the section where we refactor our helpers. [M'kay](https://www.youtube.com/watch?v=KqOsrniBooQ)?

#### Public navigation
Our `publicNavigation` component is pretty simple. Again, play along and ignore those `FlowHelpers` calls for now. Seriously. They don't exist!

<p class="block-header">/client/components/globals/public-navigation.jsx</p>

```javascript
PublicNavigation = React.createClass({
  render() {
    return (
      <div id="navbar-collapse" className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li className={FlowHelpers.currentRoute( 'login' )}>
            <a href={FlowHelpers.pathFor( 'login' )}>Login</a>
          </li>
          <li className={FlowHelpers.currentRoute( 'signup' )}>
            <a href={FlowHelpers.pathFor( 'signup' )}>Sign Up</a>  
          </li>
        </ul>
      </div>
    );
  }
});
```

Easy peasy? Just ignore those helpers and make sure to update your attributes and we're good to go! Also, notice that again, we're including that `#navbar-collapse` element to suffice the one root element in the return statement rule. 

<figure>
  <img src="https://tmc-post-content.s3.amazonaws.com/Screen-Shot-2015-10-20-17-53-03.png" alt="Be the first to identify what this is from in the comments and I'll send you a free sticker!">
  <figcaption>Only one root element! Be the first to identify what this is from in the comments and I'll send you a free sticker!</figcaption>
</figure>

Okay! Now we're going to tackle something a little bit bigger: data. While technically the `dashboard` template in Base doesn't display anything other than an `<h3></h3>` tag, it seemed worthwhile to spice things up a bit and show an example of loading data into a component. Let's take a peek now and see how that works.

#### Dashboard
We're going to introduce a handful of concepts for this one, so make sure to pay attention!

<p class="block-header">/client/components/authenticated/dashboard.jsx</p>

```javascript
Dashboard = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let subscription = Meteor.subscribe( 'dashboard' );

    return {
      isLoading: !subscription.ready(),
      people: People.find().fetch()
    };
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <PeopleTable people={this.data.people} />
      );
    }
  }
});
```
So. Let's rap. First, notice that we're introducing a new parameter on our component called `mixins` which is assigned an array with a single argument `ReactMeteorData`. This is the magic behind the `react` package developed by the Meteor Development Group that we installed earlier. With this single line, we get support for the `getMeteorData()` method along with a lot of behind the scenes goodies that make it really easy to work with reactive data in our application using React. The part to pay attention to here is the `getMeteorData()` method. 

Here, when we're working with any reactive data in our component, we want to make sure that it's referenced inside of `getMeteorData()`. Notice that we start by calling to a subscription for our dashboard template `dashboard`, followed by the return of an object with two properties: a check to see if our subscription is ready (so we can display a loader if not) and a call to `People.find().fetch()`. Hold up! What is that? To help speed us up, we've set up a collection called `People` in the application along with a publication for `dashboard`. Behind the scenes, on startup, we're automatically inserting five fake people into the `People` collection if they don't already exist. Here's what we're after:

<figure>
  <img src="https://tmc-post-content.s3.amazonaws.com/Screen-Shot-2015-10-20-18-06-12.png" alt="A list of people with a photo, name, and email address.">
  <figcaption>A list of people with a photo, name, and email address.</figcaption>
</figure>

Nothing too wild. The point here is to showcase how to get data into our component and then _share_ that data with other components. We can see that happening down in our `render()` method. First, pay attention to that call to `this.data.isLoading`. Notice that `this.data` is mapping to the object we've returned from our `getMeteorData()` method. `this.data` is a feature added as part of the `ReactMeteorData` mixin we include up above. This is the lynchpin for getting data into our components. 

Here, we first check to see if our subscription is loaded. If it isn't, we display a loading component. Real quick, let's take a peek at that.

<p class="block-header">/client/components/globals/loading.jsx</p>

```javascript
Loading = React.createClass({
  render() {
    return (
      <i style={{fontSize: '32px'}} className="fa fa-refresh fa-spin"></i>
    );
  }
});
```
Pretty simple. A single icon. Notice that here we're making use of React's inline styles technique again. Look at us! Nothing much here, so let's move back up to our `Dashboard` component and look at the next component inclusion. 

<p class="block-header">/client/components/globals/loading.jsx</p>

```javascript
Dashboard = React.createClass({
  [..]
  getMeteorData() {
    [...]
    return {
      isLoading: !subscription.ready(),
      people: People.find().fetch()
    };
  },
  render() {
    if ( this.data.isLoading ) {
      return <Loading />;
    } else {
      return (
        <PeopleTable people={this.data.people} />
      );
    }
  }
});
```
The part we're focusing on is the `<PeopleTable people={this.data.people} />` tag. Here, we're telling react to simply include the `<PeopleTable />` component, passing the result of our `People.find().fetch()` to its `people` attribute. What's that? Here, `people=` signifies the definition of a `prop`. Props (short for properties) represent the data that we'll be able to access _inside of_ the component we're adding them to. In this case, `people` will be accessible in our `<PeopleTable />` component, returning an array of objects returned from our `People` collection.

<p class="block-header">/client/components/authenticated/people-table.jsx</p>

```javascript
PeopleTable = React.createClass({
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            {this.props.people.map( ( person, index ) => {
              return <Person key={index} person={person} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
});
```

Nothing we haven't seen yet, except for the contents of `<tbody>`. Here, we're encountering our first usage of a loop in a React component. Like we described, notice that we can access the `people` prop we defined in our `Dashboard` component by calling `this.props.people`. This is a bit funky. Notice that we're also appending a call to `.map()` on the end of this. All of this is happening within React's `{}` bracket syntax for running JavaScript code inside of our component. Here, we're saying to map over the array of people we found in the database, and for each one, include the `<Person />` component, passing the current index of the loop as the `key` prop (`key` is required by React in a loop) and the current _person_ being iterated in the map as the `person` prop. A quick look at `<Person />`:

<p class="block-header">/client/components/authenticated/person.jsx</p>

```javascript
Person = React.createClass({
  render() {
    return (
      <tr>
        <td className="text-center">
          <img style={{width: '50px'}} className="img-circle" src={this.props.person.avatar} alt={this.props.person.name} />
        </td>
        <td>{this.props.person.name}</td>
        <td>{this.props.person.email}</td>
      </tr>
    );
  }
});
```

Okay! This isn't so bad, right? Here, we're returning a `<tr>` element (this will correspond to a row in our table), piping in all of the data from our `person` prop using `this.props.person`. This should look somewhat familiar. Here, when we call something like `{this.props.person.name}`, this is identical to us calling `{{name}}` inside of an `{{#each people}}{{/each}}` loop in Blaze. The syntax is a bit different, but the result is the same.  

Why the `key`, though? We're not using it in here. From [the React docs](https://facebook.github.io/react/docs/multiple-components.html):

> In these cases where the identity and state of each child must be maintained across render passes, you can uniquely identify each child by assigning it a key [...]
>
> When React reconciles the keyed children, it will ensure that any child with key will be reordered (instead of clobbered) or destroyed (instead of reused).
>
> The key should always be supplied directly to the components in the array, not to the container HTML child of each component in the array [...]

Translation? This ensures that any children of a component (in this case, our `<Person />` components) are not messed up by re-rendering or changes to the parent component. The `key` property allows React to keep track of the state of each child without losing its marbles. A bit quirky, but easy enough to commit to memory.

...and that's it! We're done with refactoring our templates. Pretty easy, yeah? As we can see, the big jump from React to Blaze is nothing more than syntax and some new naming conventions. It should be clear at this point that usage of React vs. Blaze is a matter of taste and organization. Everything we've showecased here can be accomplished with Blaze, just in a different way. 

The point? To further line Mark Zuckerberg's pockets. Kidding, kidding. It's nuanced here, but in a much bigger application, we'd likely split up our templates even further into components, tightly coupling our logic _to_ those components. Here, we can see everything at once and have a solid handle on what functionality is affecting our component without having to dig through a bunch of code. Is that a good thing? I think so.

With our templates out of the way, we have just a few more things to clean up in order to call our refactor "complete." First up, let's clean up the modules we used in our `<Login />` and `<Signup />` components to be a little more React-friendly.

### Updating modules used in our components
This one is pretty quick. We just need to make sure that any references to the template instance in our modules are scrubbed as React cannot make use of them. To keep things simple, we're going to rely on jQuery to replace all of the DOM selection we were doing with a call to the Blaze template instance.

#### Modules.client.login
First, we need to remove any reference to `template` in the module. Next, let's update our DOM selection inside of our `_handleLogin()` method.

<p class="block-header">/client/modules/login.js</p>

```javascript
[...]
let _handleLogin = () => {
  let email    = $( '[name="emailAddress"]' ).val(),
      password = $( '[name="password"]' ).val();

  Meteor.loginWithPassword( email, password, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'warning' );
    } else {
      Bert.alert( 'Logged in!', 'success' );
    }
  });
};
[...]
```

Just two lines to update: our `email` variable assignment and our `password` variable assignment. Notice that here, we simply replace `template.find()` with `$()` and instead of `value` we use `.val()`. Super easy! It's also important to note: this is just a regular `.js` JavaScript file and _not_ `.jsx`. We only need to use `.jsx` if the code we're writing has `JSX` in it. For example, if we had some logic in here to render another component, we'd want to rename the file `.jsx`. For our purposes here, vanilla `.js` is the way to go.

#### Modules.client.signup
Our `signup` module gets the same refactor. Strip all of the references to `template` and update our DOM selection to use jQuery. So it's clear:

<p class="block-header">/path</p>

```javascript
[...]
let _handleSignup = () => {
  let user = {
    email: $( '[name="emailAddress"]' ).val(),
    password: $( '[name="password"]' ).val()
  };

  Accounts.createUser( user, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'danger' );
    } else {
      Bert.alert( 'Welcome!', 'success' );
    }
  });
};
[...]
```
Not too shabby! That's all we need for now. Next up: routes.

<div class="note">
  <h3>What about recover and reset password? <i class="fa fa-warning"></i></h3>
  <p>The changes are the same in our <code>recoverPassword</code> and <code>resetPassword</code> modules: just strip out any reference to <code>template</code> and swap in DOM selection using jQuery (or native JavaScript, if you please).</p>
</div>

### Updating our routes
Now we're in the home stretch! Aside from updating our templates, we also need to update our routes. Wait, why? Recall that because we're using Flow Router, we're also using the [BlazeLayout](https://github.com/kadirahq/blaze-layout) package to help us render our Blaze templates. Now, we need to do the exact same thing, just with that package's companion [ReactLayout](https://github.com/kadirahq/meteor-react-layout). This will be easy, we're just swapping a few things in. **Heads up**: Because we'll be using some `JSX` code in our routes, we'll want to make sure we update each of our routes files to use the `.jsx` file type.

#### Our default layout
Ok, I lied. We do need to fix one thing real quick: our default layout template. Recall that in Base, we rely on a template called `default` to wrap all of our othe templates when rendering routes. This is the last template-to-component refactor, I swear. 99% of it is stuff we already know. Let's look at it:

<p class="block-header">/client/componetns/layouts/default.jsx</p>

```javascript
Default = React.createClass({
  render() {
    return (
      <div className="app-root">
        <AppHeader />
  		<div className="container">
  	      {this.props.yield}
  		</div>
      </div>
	);
  }
});
```
Simple. Notice, here, we're including the `<AppHeader />` component we defined earlier (with our nested `<AuthenticatedNavigation />` and `<PublicNavigation />` components). Inside of our `.container` element, we're making a call to `this.props.yield`. What's that? Remember, `props` are how we pass data in from a parent component. In this case, when we set up ReactLayout, we'll see that it allows us to specify the name of the prop where we want a component to render. In our case, we'll pass our component to a prop called `yield` which will display the component we pass where we're calling `{this.props.yield}`.

Also, we should point out the usage of the `.app-root` element. Yep, you guessed it: the one root element rule. Because we're including our `<AppHeader />` component as well as our `.container` element, we have to wrap them in order to avoid a meltdown. C'est la vie.

Okay. Routes! For real!

#### Public routes
This will go quick. All we need to do is update our calls to `BlazeLayout.render()` to instead use `ReactLayout.render()`, passing our layout component's variable and passing the component we want to render in place of `{this.props.yield}`.

<p class="block-header">/both/routes/public.jsx</p>

```javascript
[...]

publicRoutes.route( '/signup', {
  name: 'signup',
  action() {
    ReactLayout.render( Default, { yield: <Signup /> } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( Default, { yield: <Login /> } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recover-password',
  action() {
    ReactLayout.render( Default, { yield: <RecoverPassword /> } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'reset-password',
  action() {
    ReactLayout.render( Default, { yield: <ResetPassword /> } );
  }
});
```
A little _too_ easy. Thanks, [Arunoda](https://twitter.com/arunoda)! Two updates. First, notice that we pass `Default` (the global variable for our layout component) as the first parameter, and `<ComponentName />` as the value of our `yield` parameter. Why the difference? This is so that the value we pass plays nicely with React's `React.renderComponent()` method which [ReactLayout is calling behind the scenes](https://github.com/kadirahq/meteor-react-layout/blob/master/lib/react_layout.js#L58).

Notice that all we're doing is passing our components. That's it. ReactLayout takes care of the rest for us. Awesome! I bet you can guess what our authenticated rotues will look like. For good measure, let's take a peek.

#### Authenticated routes
Just a quick dump of our refactor here:

<p class="block-header">/both/routes/authenticated.jsx</p>

```javascript
[...]

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    ReactLayout.render( Default, { yield: <Index /> } );
  }
});

authenticatedRoutes.route( '/dashboard', {
  name: 'dashboard',
  action() {
    ReactLayout.render( Default, { yield: <Dashboard /> } );
  }
});
```
Yup, pretty vanilla. That's a good thing, though, right? We pass our layout template's variable and then for each of our routes, assign the component we want to render in place of `{this.props.yield}`.

#### Configure
We musn't forget, in our `/both/routes/configure.jsx` file, we need to update our include for our `notFound` route:

<p class="block-header">/both/routes/configure.jsx</p>

```javascript
FlowRouter.notFound = {
  action() {
    ReactLayout.render( Default, { yield: <NotFound /> } );
  }
};

[...]
```
Yup, easy! Keep in mind, we didn't refactor our `notFound` template into the `<NotFound />` component in this article, but [it is visible in the source for the recipe](https://github.com/themeteorchef/getting-started-with-react/blob/master/code/client/components/globals/not-found.jsx).

### Updating our Flow Router helpers
Last step! It's time to get those helpers we're using for our routes up to date. Two of them are used in Base and one is included as a backup. Let's take a look at how they've been refactored, discuss the changes, and then showcase an example of their usage. Real quick, promise.

<p class="block-header">/client/helpers/flow-router.js</p>

```javascript
let pathFor = ( path, params ) => {
  let query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};
  return FlowRouter.path( path, params, query );
};

let urlFor = ( path, params ) => {
  return Meteor.absoluteUrl( pathFor( path, params ) );
};

let currentRoute = ( route ) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'active' : '';
};

FlowHelpers = {
  pathFor: pathFor,
  urlFor: urlFor,
  currentRoute: currentRoute
};
```

We've technically lost some weight here. Remember, before, we were making use of [global template helpers](https://themeteorchef.com/snippets/using-global-template-helpers) to get back the values above. Now, because we're removing Blaze, all we need are good ol' fashioned functions. For convenience, we've created a global variable at the bottom of our helpers file called `FlowHelpers`, assigning each of the methods to a parameter name so we can call them easily later.

The big change here is in the `pathFor` helper. Here, we've removed all references to the `hash` and `view` properties that we got from our Spacebars helpers (the hash is what contained the values assigned like `{{pathFor hashProp="something" anotherHashProp="this thing"}}`). Here, we don't have that so we've ripped it all out. Instead, we accept the `path` value like we did before and update the `hash` value to simply be `params`. When this is called then, our code will look like `FlowHelpers.pathFor( 'routeName', { paramName: 'blah', query: { queryParam: 'blah' } } );`. Despite the usage of objects, it's more-or-less what we had with the original helper. 

The same applies here for `urlFor` (after all, it's just a wrapper around `pathFor` using `Meteor.absoluteUrl`). `currentRoute` is identical to its predecessor, the only difference being that it's a vanilla JavaScript function now instead of a call to `Template.registerHelper`. If you've been following along, usage of these is what you'd expect. Reprising our `<PublicNavigation />` component:

<p class="block-header">/client/components/globals/public-navigation.jsx</p>

```javascript
PublicNavigation = React.createClass({
  render() {
    return (
      <div id="navbar-collapse" className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li className={FlowHelpers.currentRoute( 'login' )}>
            <a href={FlowHelpers.pathFor( 'login' )}>Login</a>
          </li>
          <li className={FlowHelpers.currentRoute( 'signup' )}>
            <a href={FlowHelpers.pathFor( 'signup' )}>Sign Up</a>  
          </li>
        </ul>
      </div>
    );
  }
});
```
Pretty much what you'd expect. We make use of the inline `{}` bracket syntax, calling our functions directly. Notice, too, we can pass arguments so this will evaluate just fine if we called something like `{FlowHelpers.pathFor( 'login', { query: { taco: "okay" } } )}`. Super. Awesome.

Alright, buckaroo! We did it! We've successfully refactored Base to use React instead of Blaze. How does it feel? Was it as scary as all the übernerds made it out to be? Nah.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Klf5qLV9Ljs" frameborder="0" allowfullscreen></iframe>

### Wrap up & summary
In this recipe, we got a cursory introduction to the React user interface library. We learned how to refactor Blaze templates and logic into React components, how to work with nested components and logic, and even learned how to compensate for the loss of features like Blaze's template helpers. In addition, we learned how to update our routes to use the ReactLayout package to help us render our components.