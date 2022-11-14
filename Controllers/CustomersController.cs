using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameBuster.DBContext;
using GameBuster.Models;
using AutoMapper;
using GameBuster.DTOs;
using Microsoft.AspNetCore.Mvc.Rendering;
using NuGet.Protocol.Core.Types;

namespace GameBuster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public CustomersController(AppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        /// <summary>
        /// Return all Customers
        /// </summary>
        /// <returns>All Customers</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Customers
        /// </remarks>
        /// <response code="200">Returns all Customers</response>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDTO>>> GetCustomers()
        {
            var results = await _context.Customers.ToListAsync();
            return Ok(_mapper.Map<List<CustomerDTO>>(results));
        }

        /// <summary>
        /// Return the frecuent customer
        /// </summary>
        /// <returns>a Customer</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Customers/GetFrecuentCustomer
        /// </remarks>
        /// <response code="200">Returns the frecuent customer</response>
        /// <response code="404">If the Customer was not found</response>
        [HttpGet("GetFrecuentCustomer")]
        public async Task<ActionResult<CustomerDTO>> GetFrecuentCustomer()
        {

            var frecuentCustomer = await _context.Rents.GroupBy(c => c.CustomerId, (x, y) => new
            {
                quantity = y.Count(),
                customer_id = x,
            }).OrderByDescending(a => a.quantity).FirstOrDefaultAsync();

            if (frecuentCustomer == null)
            {
                return NotFound();
            }

            var client = await _context.Customers.FindAsync(frecuentCustomer.customer_id);

            return Ok(_mapper.Map<CustomerDTO>(client));
        }

         /// <summary>
        /// Return a customer by its id
        /// </summary>
        /// <param name="id">Id of the Customer</param>
        /// <returns>a Customer</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/Customers/5
        /// </remarks>
        /// <response code="200">Returns the Customer</response>
        /// <response code="404">If the Customer was not found</response>
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDTO>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CustomerDTO>(customer));
        }

        
        /// <summary>
        /// Update the given Customer by its id
        /// </summary>
        /// <returns></returns>
        /// <remarks>
        /// <param name="id">Customer id</param>
        /// <param name="newCustomer">Customer info</param>
        /// Sample request
        /// PUT: api/Customers/5
        /// </remarks>
        /// <response code="204"> Customer uptaded sucefully </response>
        /// <response code="400">If any changes was sended </response>
        /// <response code="404">If the Customer was not found</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, CustomerDTO newCustomer)
        {
            var customer = _mapper.Map<Customer>(newCustomer);

            if (id != customer.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        /// <summary>
        /// Create the given Customer
        /// </summary>
        /// <remarks>
        /// <param name="newCustomer">Customer info</param>
        /// Sample request
        /// POST: api/Customers
        /// </remarks>
        /// <response code="200"> Customer created </response>
        [HttpPost]
        public async Task<ActionResult<CustomerDTO>> PostCustomer(CustomerDTO newCustomer)
        {
            var customer = _mapper.Map<Customer>(newCustomer);
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            newCustomer.CustomerId = customer.CustomerId;

            return CreatedAtAction("GetCustomer", new { id = customer.CustomerId }, customer);
        }

        /// <summary>
        /// Delete a Customer by its id
        /// </summary>
        /// <remarks>
        /// <param name="id">Customer id</param>
        /// Sample request
        /// DELETE: api/Customers/5
        /// </remarks>
        /// <response code="204"> Customer deleted</response>
        /// <response code="404">If the Customer was not found</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }

       
    }
    
}
