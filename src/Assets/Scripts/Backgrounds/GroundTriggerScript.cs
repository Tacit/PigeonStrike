using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GroundTriggerScript : MonoBehaviour {
    public Transform pooPrefab;
    // Use this for initialization
    void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag != "Poo")
            return;

        var poo = Instantiate<Transform>(pooPrefab);
        poo.position = new Vector3(collision.gameObject.transform.position.x, collision.gameObject.transform.position.y + Random.Range(0f, 1f));
        Destroy(collision.gameObject);
    }
}
