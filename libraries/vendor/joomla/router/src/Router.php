<?php
/**
 * Part of the Joomla Framework Router Package
 *
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE
 */

namespace Joomla\Router;

/**
 * A path router.
 *
 * @since  1.0
 */
class Router implements \Serializable
{
	/**
	 * An array of Route objects defining the supported paths.
	 *
	 * @var    Route[]
	 * @since  __DEPLOY_VERSION__
	 */
	protected $routes = [];

	/**
	 * Constructor.
	 *
	 * @param   array  $maps  An optional array of route maps
	 *
	 * @since   1.0
	 */
	public function __construct(array $maps = [])
	{
		if (! empty($maps))
		{
			$this->addRoutes($maps);
		}
	}

	/**
	 * Add a route of the specified method to the router. If the pattern already exists it will be overwritten.
	 *
	 * @param   Route  $route  The route definition
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function addRoute(Route $route): self
	{
		$this->routes[] = $route;

		return $this;
	}

	/**
	 * Add an array of route maps to the router.  If the pattern already exists it will be overwritten.
	 *
	 * @param   array  $routes  A list of route maps to add to the router as $pattern => $controller.
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 * @throws  \UnexpectedValueException  If missing the `pattern` or `controller` keys from the map.
	 */
	public function addRoutes(array $routes): self
	{
		foreach ($routes as $route)
		{
			if ($route instanceof Route)
			{
				$this->addRoute($route);
			}
			else
			{
				// Ensure a `pattern` key exists
				if (! array_key_exists('pattern', $route))
				{
					throw new \UnexpectedValueException('Route map must contain a pattern variable.');
				}

				// Ensure a `controller` key exists
				if (! array_key_exists('controller', $route))
				{
					throw new \UnexpectedValueException('Route map must contain a controller variable.');
				}

				// If defaults, rules have been specified, add them as well.
				$defaults = $route['defaults'] ?? [];
				$rules    = $route['rules'] ?? [];
				$methods  = $route['methods'] ?? ['GET'];

				$this->addRoute(new Route($methods, $route['pattern'], $route['controller'], $rules, $defaults));
			}
		}

		return $this;
	}

	/**
	 * Get the routes registered with this router.
	 *
	 * @return  Route[]
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function getRoutes(): array
	{
		return $this->routes;
	}

	/**
	 * Parse the given route and return the name of a controller mapped to the given route.
	 *
	 * @param   string  $route   The route string for which to find and execute a controller.
	 * @param   string  $method  Request method to match. One of GET, POST, PUT, DELETE, HEAD, OPTIONS, TRACE or PATCH
	 *
	 * @return  ResolvedRoute
	 *
	 * @since   1.0
	 * @throws  \InvalidArgumentException
	 * @throws  Exception\MethodNotAllowedException
	 */
	public function parseRoute($route, $method = 'GET')
	{
		$method = strtoupper($method);

		// Get the path from the route and remove and leading or trailing slash.
		$route = trim(parse_url($route, PHP_URL_PATH), ' /');

		// Iterate through all of the known routes looking for a match.
		foreach ($this->routes as $rule)
		{
			if (preg_match($rule->getRegex(), $route, $matches))
			{
				// Check if the route supports this method
				if (!empty($rule->getMethods()) && !\in_array($method, $rule->getMethods()))
				{
					throw new Exception\MethodNotAllowedException(
						array_unique($rule->getMethods()),
						sprintf('Route `%s` does not support `%s` requests.', $route, strtoupper($method)),
						405
					);
				}

				// If we have gotten this far then we have a positive match.
				$vars = $rule->getDefaults();

				foreach ($rule->getRouteVariables() as $i => $var)
				{
					$vars[$var] = $matches[$i + 1];
				}

				return new ResolvedRoute($rule->getController(), $vars, $route);
			}
		}

		throw new Exception\RouteNotFoundException(sprintf('Unable to handle request for route `%s`.', $route), 404);
	}

	/**
	 * Add a GET route to the router. If the pattern already exists it will be overwritten.
	 *
	 * @param   string  $pattern     The route pattern to use for matching.
	 * @param   mixed   $controller  The controller to map to the given pattern.
	 * @param   array   $rules       An array of regex rules keyed using the route variables.
	 * @param   array   $defaults    An array of default values that are used when the URL is matched.
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function get(string $pattern, $controller, array $rules = [], array $defaults = []): self
	{
		return $this->addRoute(new Route(['GET'], $pattern, $controller, $rules, $defaults));
	}

	/**
	 * Add a POST route to the router. If the pattern already exists it will be overwritten.
	 *
	 * @param   string  $pattern     The route pattern to use for matching.
	 * @param   mixed   $controller  The controller to map to the given pattern.
	 * @param   array   $rules       An array of regex rules keyed using the route variables.
	 * @param   array   $defaults    An array of default values that are used when the URL is matched.
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function post(string $pattern, $controller, array $rules = [], array $defaults = []): self
	{
		return $this->addRoute(new Route(['POST'], $pattern, $controller, $rules, $defaults));
	}

	/**
	 * Add a PUT route to the router. If the pattern already exists it will be overwritten.
	 *
	 * @param   string  $pattern     The route pattern to use for matching.
	 * @param   mixed   $controller  The controller to map to the given pattern.
	 * @param   array   $rules       An array of regex rules keyed using the route variables.
	 * @param   array   $defaults    An array of default values that are used when the URL is matched.
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function put(string $pattern, $controller, array $rules = [], array $defaults = []): self
	{
		return $this->addRoute(new Route(['PUT'], $pattern, $controller, $rules, $defaults));
	}

	/**
	 * Add a DELETE route to the router. If the pattern already exists it will be overwritten.
	 *
	 * @param   string  $pattern     The route pattern to use for matching.
	 * @param   mixed   $controller  The controller to map to the given pattern.
	 * @param   array   $rules       An array of regex rules keyed using the route variables.
	 * @param   array   $defaults    An array of default values that are used when the URL is matched.
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function delete(string $pattern, $controller, array $rules = [], array $defaults = []): self
	{
		return $this->addRoute(new Route(['DELETE'], $pattern, $controller, $rules, $defaults));
	}

	/**
	 * Add a HEAD route to the router. If the pattern already exists it will be overwritten.
	 *
	 * @param   string  $pattern     The route pattern to use for matching.
	 * @param   mixed   $controller  The controller to map to the given pattern.
	 * @param   array   $rules       An array of regex rules keyed using the route variables.
	 * @param   array   $defaults    An array of default values that are used when the URL is matched.
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function head(string $pattern, $controller, array $rules = [], array $defaults = []): self
	{
		return $this->addRoute(new Route(['HEAD'], $pattern, $controller, $rules, $defaults));
	}

	/**
	 * Add a OPTIONS route to the router. If the pattern already exists it will be overwritten.
	 *
	 * @param   string  $pattern     The route pattern to use for matching.
	 * @param   mixed   $controller  The controller to map to the given pattern.
	 * @param   array   $rules       An array of regex rules keyed using the route variables.
	 * @param   array   $defaults    An array of default values that are used when the URL is matched.
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function options(string $pattern, $controller, array $rules = [], array $defaults = []): self
	{
		return $this->addRoute(new Route(['OPTIONS'], $pattern, $controller, $rules, $defaults));
	}

	/**
	 * Add a TRACE route to the router. If the pattern already exists it will be overwritten.
	 *
	 * @param   string  $pattern     The route pattern to use for matching.
	 * @param   mixed   $controller  The controller to map to the given pattern.
	 * @param   array   $rules       An array of regex rules keyed using the route variables.
	 * @param   array   $defaults    An array of default values that are used when the URL is matched.
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function trace(string $pattern, $controller, array $rules = [], array $defaults = []): self
	{
		return $this->addRoute(new Route(['TRACE'], $pattern, $controller, $rules, $defaults));
	}

	/**
	 * Add a PATCH route to the router. If the pattern already exists it will be overwritten.
	 *
	 * @param   string  $pattern     The route pattern to use for matching.
	 * @param   mixed   $controller  The controller to map to the given pattern.
	 * @param   array   $rules       An array of regex rules keyed using the route variables.
	 * @param   array   $defaults    An array of default values that are used when the URL is matched.
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function patch(string $pattern, $controller, array $rules = [], array $defaults = []): self
	{
		return $this->addRoute(new Route(['PATCH'], $pattern, $controller, $rules, $defaults));
	}

	/**
	 * Add a UNIVERSAL (catchall) route to the router. If the pattern already exists it will be overwritten.
	 *
	 * @param   string  $pattern     The route pattern to use for matching.
	 * @param   mixed   $controller  The controller to map to the given pattern.
	 * @param   array   $rules       An array of regex rules keyed using the route variables.
	 * @param   array   $defaults    An array of default values that are used when the URL is matched.
	 *
	 * @return  $this
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function all(string $pattern, $controller, array $rules = [], array $defaults = []): self
	{
		return $this->addRoute(new Route([], $pattern, $controller, $rules, $defaults));
	}

	/**
	 * Serialize the router.
	 *
	 * @return  string  The serialized router.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function serialize()
	{
		return serialize($this->__serialize());
	}

	/**
	 * Serialize the router.
	 *
	 * @return  array  The data to be serialized
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function __serialize()
	{
		return [
			'routes' => $this->routes,
		];
	}

	/**
	 * Unserialize the router.
	 *
	 * @param   string  $serialized  The serialized router.
	 *
	 * @return  void
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function unserialize($serialized)
	{
		$this->__unserialize(unserialize($serialized));
	}

	/**
	 * Unserialize the router.
	 *
	 * @param   array  $data  The serialized router.
	 *
	 * @return  void
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function __unserialize(array $data)
	{
		$this->routes = $data['routes'];
	}
}
